# MTMESS 
## Overview
~~~sql
~ Web message application made with Spring, ReactJS and PostgreSQL.
The users are able to register, log in, add friends and send messages trough websockets. 
~~~

## Technologies

- Spring Boot :leaves:
    - Maven
      - Build automation tool to aid in solving the package dependencies and control the compile flow of the program.
    - JPA
      - Used to create a responsive database API based on the persistence framework
    - SockJS Websocket
      - Wrapper for the basic chat functionalities, using sockets. Message routing was handled by a built-in broker. 
- PostgresSQL :elephant:
  - Used to create and manage an external database that can be accessed from any source as long as the project is running. The database keeps the messages, the users and the friends of each user, in order to persist the data upon closing the application.
  
- ReactJS :electron:
  - The front-end of the project was created in ReactJS, using functional components, state variables and conditional rendering. 


## Using the repository

~~~bash
# To clone the repository, simply use
    git clone https://github.com/OOP-Projects-2021-2022/MTmess.git

# To start the back-end, go to the root project directory and use maven
    mvn spring::boot run

# To start the front-end component, go to "/frontend/src/" and use the NodeJs packet manager
    npm start

# You should see your app running on localhost, port 3000
~~~

## Spring

### 1. PostgreSQL with JPA

### Database integration was made following the JPA <b>entity</b> - <b>repository</b> - <b>service</b> - <b>controller</b> schema. Every table has a corresponding class, annotated with "Entity". 
Simple example :
~~~java
@Table(name = "Users")
@Entity
public class UserEntity{

    public UserEntity(){} // Empty constructor needed according to JPA requirements

    @Id @GeneratedValue(strategy = GenerationType.AUTO)// auto increment for new entries
    private Integer ID;
    
    @Column(unique = true)
    private String name;

    @Column
    private String email;

    @Column(nullable = false)
    private String hashedpassword;

    --- constructors, getters, setters ---
~~~

### We also need to integrate a repository, which will extend the classic JPARepository template interface which has all the database operations we may need. 

~~~java
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    // For routing socket communication
    UserEntity findByName(String name); 
    // For client authentication
    UserEntity findByNameAndHashedpassword(String name, String hashedpassword); 
}

~~~

### Operations as "add to database" don't need to be declared, since they are implicit, but any other logic functions should be declared here, such as "findByName". The function signature is specific and should contain fields declared in the entity as well as operation keywords (findBy)
<br>
<br>

### A service is needed for incorporating additional logic to the application procedures. This service will use the created repository trough dependency injection, specified by the "Autowired" annotation.

~~~java
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserEntity saveUser(UserEntity user) {

        // Check if user already exists
        UserEntity userAux = userRepository.findByName(user.getName()); 

        System.out.println(userAux);
        if (userAux == null) {
            return userRepository.save(user);
        }
        System.out.println("User already exists");
        return null;
    }

    {...}
~~~

### In this class, the relational logic bulk of the program will be created. Operations such as hashing the passwords, input sanitization checks or logic error correction should be implemented. Some examples follow:
~~~java
    {...}
 @Override
    public FriendshipEntity saveFriendship (FriendshipEntity friendship) throws InvalidFriendshipException, SelfFriendshipException {
        // Check if users exist

        String url = "http://localhost:8080/user/find?name={q}";

        RestTemplate restTemplate = new RestTemplate();

        String req = restTemplate.getForObject(url, String.class, friendship.getUser1());
        String req2 = restTemplate.getForObject(url, String.class, friendship.getUser2());

        if ( req == null || req2 == null )  throw new InvalidFriendshipException("Users don't exist."); // Users dont exist - Return exception

        if (friendship.getUser1().equals(friendship.getUser2())){ // Users are the same
            throw new SelfFriendshipException("User1 is equal to User2... Such a shame");
        }


        return friendshipRepository.save(friendship);
    }
    {...}
~~~
~~~java
    {...}
    try {
        // Hash the password before adding to DB
        user.setHashedpassword( user.getHash( user.getHashedpassword() ) );
        userRepository.saveUser(user);
        return "User was added!"; 
        }catch ( Exception e ) {
            return "Failed to add user.";
    }
    {...}
~~~
<br>

### Last part consists of a controller, which maps operations done by JPA to a URI path, thus creating an API for the front-end component to use. This part uses dependency injection on the service, which now contains JPA ground schemes and additional logic

~~~java
@RestController
@RequestMapping("/user")
@CrossOrigin // ReactJS front-end interaction violates the CORS policy
public class UserController {
    {...}
    // Fetch all entries in the user database with a GET request
    @GetMapping("/find/all")
    public ResponseEntity<List<UserEntity>> findAll(){
        return new ResponseEntity<>( userService.findAll() , HttpStatus.OK );
    }
    {...}
}
~~~
<br> <br>
### 2. Websocket

### Websockets consist of parts split between Spring and React. The Spring side models the template of a STOMP architecture, adding SockJS sockets over it. Simply put, messages will be handled server-side by a already existing message broker, which just needs to be configured: endpoints and destination prefixes.

<br>

### Real-time messages with multiple users at the same time is enabled by adding a controller using the message broker and creating multiple route paths according to a variable, which in our case is the username of the one we want to connect to. 

~~~java
@RestController // Handles incoming messages and sends them to the users.
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate; // wrapper for socket logic


    @MessageMapping("/chat/{username}")  // same as configured endpoint for the broker
    public String sendMessage(@DestinationVariable String username, MessageEntity message) throws IOException {
        simpMessagingTemplate.convertAndSend("/topic/messages/" + username, message);
    {...}
~~~

### When sending a message to {X}, a serialized message object (json type) will be sent to /chat/{X}. At the same time, STOMP configures a "subscribe" function, which creates a listener on path /messages/topic/{X}. The message broker takes care of the routing. ( client1 -> /chat/{X} (msgbroker) -> /messages/topic/{X} -> client2 }

### Note: Each user receives messages from every source, the filtering of individual conversations is done by state variables in react.

## React

### 3. Main components


### Main components that were used are the login page, register page and the feed page. The first two use MaterialUI while the feed contains more of a vanilla css design, with no imported elements. The routing between pages is done via a browser-router component:

~~~js
function App () {

  const [user, setUser] = useState();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUser={setUser}/>}/>
          <Route  path="/register" element={<Register/>}/>
          <Route path="/feed" element={<Feed user={user} setUser={setUser}/>} isPrivate/>
          <Route element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
~~~

### Registering creates a request to the database API for creating a user. Logging in creates a request for finding a user by a specified name and password. The values that are sent in the request are taken from events triggered by entering input on the textboxes. Short example: 

~~~js
    // Password and name are state variables set by input events.
    const clickHandler = async () => {
        const response = await fetch(`http://localhost:8080/user/find/log?name=${name}&password=${password}`)
        try {
            const data = await response.json()
            setUser(name);
            window.localStorage.setItem('name', JSON.stringify(name)); // used for persisting data on refresh
            navigate('/feed');
        }
        catch {
            alert("Incorrect credentials!")
        }
    }
~~~

### The front-end contains of 5 big state variables which generate the flow of the feed. 
#### - The user is the one whose name is used for socket subscribe initialisation and message object sender field.
#### - The friends array is used to keep track of friends. This array is being loaded from DB at the first render, then it can be modified by adding another friend from the "+" button. Every friend is rendered on the "conversations" component.
#### - The messages array is similar in functionality to the friends array, but rendered on a different component.
#### - The conversation state is toggled when clicking on a friend and is used as a link between friends and messages. 





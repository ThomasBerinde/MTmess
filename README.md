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

# To start the front-end component, go to "/frontend" and use the NodeJs packet manager
    npm start

# You should see your app running on localhost, port 3000
~~~


## For more information, please check the "EXTENDED_README" file.

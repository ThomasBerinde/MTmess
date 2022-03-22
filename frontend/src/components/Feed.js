import ConversationBar from "./ConversationBar"
import UserBar from './UserBar'
import TypeBar from './TypeBar'
import Messages from "./Messages"
import Conversations from "./Conversations"
import { useState, useEffect } from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import maier from "../images/maier-side.png"
import thomas from "../images/thomas-side.png"

pulapula pizda pizda
// In order of priority
/** TODO 1: IMPLEMENT SCROLL ON THE MESSAGES PAGE*/
/** TODO 2: PERSIST STATE OF CURRENT USER AND CONVERSATION UPON RELOADING THE PAGE */
/** TODO 3: DISPLAY ONLY THE FRIENDS WITH WHICH THE USER HAS AT LEAS ONE MESSAGE */
/** TODO 4: CHANGE THE MATERIAL UI BUTTON BECAUSE IT DOESN'T RESIZE*/
/** TODO 5: LINE 64*/
/** TODO 6: LINE 83*/

const Feed = ({ user, setUser }) => {

    console.log("Feed?user: " + user);

    let aux = null;

    // When addButton is 1, the field for adding a friend will show
    const [addButton, setAddButton] = useState(0);

    const [stompClient, setStompClient] = useState([{}]);

    // Array of strings that represent all the friends of the current ${user}
    const [friends, setFriends] = useState([]);

    const [messages, setMessages] = useState([
        {
            sender: " ",
            receiver: " ",
            content: " "
        }
    ]); // array of objects

    // The conversation tells me to whom the current user want to talk to
    // Whenever the user clicks on the name of a person, this state will
    // be set to the name of that person
    // The initial state is a random string of characters that represents
    // the fact that no conversation has yet to be selected by the user
    const [conversation, setConversation] = useState("y!MVd(DA*x3@&fw");

    /** PERSISTING THE STATE OF THE USER*/
    useEffect(async () => {
        const getFriends = async () => {
            await sleep(200);
            console.log("Feed/getFriends?user: " + user)
            const data = await fetchFriends()
            console.log("Debug 2 " + user);
            let aux = [];
            console.log("Debug 3 " + user);
            data.map((data) => aux = [...aux, data.user2]);
            setFriends(aux);
            console.log("Feed/getFriends?data: " + data)
        }
        await getFriends();
        console.log("Debug 4 " + user);
    }, [])

    useEffect(() => {
        localStorage.setItem("userSaved", JSON.stringify(user));
    })

    /** FETCHING FROM DATABASE */
        // Friends
        // Get the friends of the current ${user} once

    const sleep = (millisec) => {
            return new Promise(resolve => setTimeout(resolve, millisec));
        }

    const fetchFriends = async () => {
        const response = await fetch(`http://localhost:8080/friendship/find?user1=${user}&user2=`)
        try {
            const data = await response.json()
            return data
        }
        catch {
            alert("You don't have any friends")  /** TODO 5: REMOVE TRY CATCH */
        }
    }

    // Messages
    // Get the messages of the current ${user} with ${conversation} every time ${conversation} changes
    useEffect(() => {
        const getMessages = async () => {
            const data = await fetchMessages(conversation); // all the messages with ${conversation}
            let aux = [];
            data.map((data) => aux = [...aux, data]);
            setMessages(aux);  // each message contains 3 fields, sender, receiver and content
        }
        getMessages()
    }, [conversation])

    // Fetch messages of current user with ${conversation}
    const fetchMessages = async (conversation) => {
        /** TODO 6: CHECK FOR ERROR UPON RETRIEVING THE DATA FROM BACKEND */
        const response = await fetch(`http://localhost:8080/message/find/and?user1=${user}&user2=${conversation}`);
        const data = await response.json();
        return data
    }

    /** SOCKETS */
    const socketInit = () => {
        // Using SockJS over Stomp
        let mySocket = new SockJS('http://localhost:8080/chat/' );
        aux = Stomp.over(mySocket);

        aux.connect( {username:user} , function(frame) {
            aux.subscribe('/topic/messages/' + user, function(messageOutput)
            {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        } );
        setStompClient(aux);
    }

    const showMessageOutput= (messageOutput) => {
        setMessages(messages => [...messages, messageOutput]);
    }

    useEffect(() => {
        socketInit(); // This effect will make socketInit run only once, because it has an empty dependency array.
        // (Otherwise the function will run every time something form the array changes state)
        // console.log(stompClient)
    }, []);

    // Persisting state on refresh

    return (
        <body className={'feed'}>
        <div className={'messagewindow'}>
            <Messages user={user} conversation={conversation} messages={messages}/>
            <TypeBar user={user} conversation={conversation} setMessages={setMessages} stompClient={stompClient}/>
            <Conversations user={user}
                           setConversation={setConversation}
                           friends={friends}
                           stompClient={stompClient}
                           addButton={addButton} setAddButton={setAddButton}/>
            <UserBar user={user} setFriends={setFriends} setAddButton={setAddButton}/>
            <ConversationBar conversation={conversation}/>
        </div>
        <img className={"thomas"} src={thomas}/>
        <img className={"maier"} src={maier}/>
        </body>
    )
}

export default Feed;

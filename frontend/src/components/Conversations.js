import Conversation from "./Conversation";
import {useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from '@mui/icons-material/Cancel';

const Conversations = ({ user, setConversation, friends, addButton, setAddButton }) => {

    // All registered users
    const [totalUsers, setTotalUsers] = useState([{}]);

    // The friend the user is searching for
    const [friendQuery, setFriendQuery] = useState('');

    // When adding the friend
    const addFriendHandler = () =>
    {
        // Add friendship to DB
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { user1: user, user2:friendQuery} )
        };
        console.log("Friend querry: " + friendQuery)

        // Send request
        fetch('http://localhost:8080/friendship/add', request)
            .then(); // friend will get added in the 'friends' state var from the db on the next render

        console.log("Request: " + JSON.stringify(request))

        // Close the search bar
        setAddButton(0);
    }

    const closeAddFriend = () => {
        setAddButton(0);
    }


    useEffect(() => {
        let aux = [];
        var i;
        // Simple get request
        fetch('http://localhost:8080/user/find/all') // returns a promise
            .then( function(response) { return response.json(); } ) // ALSO returns a promise ( haha )
            .then( function(rawData) {
                for( i = 0; i < rawData.length; i++ )
                {
                    aux[i] = rawData[i].name;
                }
            })

        setTotalUsers(aux)
    }, []);

    return (
        <div className={'friends'}>
            {
                friends.length > 0 ?
                    friends.map((friend) => (
                    <Conversation friend={friend} setConversation={setConversation}/>
                    )) :
                    "You currently don't have any conversations"
            }
            {
                addButton === 1 ?
                (
                    <div id="AddFriend">
                        <Autocomplete id="AddFriendAutocomplete"
                            options={totalUsers}
                            inputValue={friendQuery}
                            onInputChange={(event, newInputValue) => {
                                setFriendQuery(newInputValue);
                            }
                            }
                            renderInput={(params) => <TextField {...params} placeholder={"Add friend"} type={"text"}/>}
                        />
                        <AddIcon onClick={addFriendHandler}/>
                        <CancelIcon className={"cancelIcon"} onClick={closeAddFriend}/>
                    </div>
                ) :
                null
            }
        </div>
    )
}

export default Conversations;

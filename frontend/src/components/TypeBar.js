import Button from '@mui/material/Button';


const TypeBar = ({ user, conversation, setMessages, stompClient }) => {


    const sendMessage = () => {

        if (conversation !== "y!MVd(DA*x3@&fw") {
            // Fetch the message using plain DOM manipulation
            var message = document.getElementById("InputId").value;

            if ( message === "" )
                return;

            var content = JSON.stringify({
                receiver: conversation,
                sender: user,
                content: message
            })

            stompClient.send("/app/chat/" + conversation, {}, content );

            // Add message to message array in order to print it on screen

            var toSend = ({
                receiver: conversation,
                sender : user,
                content: message
            })

            setMessages(messages => [...messages, toSend]);

            // Add message to Database ( should always work so no error checking/handling here )

            // Forge request
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { sender:user , receiver:conversation, content:message } )
            };

            // Send request
            fetch('http://localhost:8080/message/add', request)
                .then( console.log("Added message to db...") )
        }

        // Reset the input button
        document.getElementById("InputId").value = ""

    }

    return (
        <div>
            <div className={'typebarwrapper'}></div>
            <div className={"sendbutton"}>
                <Button variant="outlined" onClick={sendMessage}>Send</Button>
            </div>
            <input className={'typebar'}
               id="InputId"
               type={'text'}
               placeholder={'Type a message'}/>

        </div>
    )
}

export default TypeBar;

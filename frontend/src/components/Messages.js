import Message from './Message'

// Messages to be loaded from the specific conversation
const Messages = ({ user, conversation, messages }) => {
    const message1 = "Press on a name"
    return (
        <div className={'messages'}>
            {
                conversation === "y!MVd(DA*x3@&fw" ?
                    <h4>Choose a conversation</h4> :
                    (messages.length > 0 ?  // change this
                        messages.filter((message) => message.sender === user || message.sender === conversation).map((message) => (
                            message.sender === user ?
                                <Message message={message} sent={true}/> :
                                <Message message={message} sent={false}/>
                        )) :
                        " You have no messages with this person")  // to be changed to the person's name
            }
        </div>
    )
}
// Commit test 2
export default Messages;

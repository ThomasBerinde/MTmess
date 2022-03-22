// message is one message between the user and the current conversation
// sent is a boolean which tells me if the message was sent by the user (true) or received by the user (false)
const Message = ({ message, sent }) => {
    return (
        <div className={`message ${sent ? 'sent' : ''} ${sent ? '' : 'received'}`}>
            <h4>{message.content}</h4>
        </div>
    )
}

export default Message

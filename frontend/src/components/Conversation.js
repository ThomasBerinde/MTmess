const Conversation = ({ friend, setConversation}) => {
    // Here, the user should double-click on the conversation
    // The name of the user on which was clicked should
    // "propagate" back towards the feed page, so that it
    // can be passed to the messages
    // We do this by setConversation
    return (
        <h3 className={"conversation"} onDoubleClick={() => setConversation(friend)}>
            {friend}
        </h3>
    )
}

export default Conversation

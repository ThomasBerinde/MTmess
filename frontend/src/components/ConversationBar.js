const ConversationBar = ({ conversation }) => {
    return (
        <div className={"conversationbar"}>
            {
                conversation === "y!MVd(DA*x3@&fw" ?
                " " :
                <h2>{conversation}</h2>
            }
        </div>
    )
}

export default ConversationBar

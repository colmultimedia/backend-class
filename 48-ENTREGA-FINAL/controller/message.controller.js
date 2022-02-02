class MessageController {
// usar async await
    find (req, res) {

        res.send(req.params.email)
    }

    send (req, res) {
        res.send("en construcción")
    }

    chat (req, res) {
        res.render("chat")
    }

}

export default MessageController
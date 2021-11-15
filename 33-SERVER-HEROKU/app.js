import  express  from "express"
const app = express()
const port = process.env.PORT || 8080


app.use(express.static("public"))


app.get("/message", (req, res) => {
    const msg = {
        msg: "Hello there, this is a route message with bull shit"
    }
    res.json(msg)
})

const server = app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})
server.on("error", error => console.log(`We have issues with the server: => ${error} `))
import  express  from "express"
import cluster from "cluster"
import * as os from "os"
 import { isPrime } from "./is-prime.js"
const modoCluster = process.argv[3] == "CLUSTER"

if(modoCluster && cluster.isMaster) {

    const numCPUs = os.cpus().length

    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }
    cluster.on("exit", worker => {
        console.log("worker", worker.process.pid, "died", new Date().toLocaleString())
        cluster.fork()
    })
}

else {
    const app = express()

    app.get("/", (req, res) =>{
        const primes = []
        const max = Number(req.query.max) || 1000

        for(let i =1; i<= max; i++) {
            if(isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })

    const PORT = parseInt(process.argv[2]) || 8080

    app.listen(PORT, err => {
        if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}
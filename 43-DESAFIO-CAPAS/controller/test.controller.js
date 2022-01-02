import { sayNameAndAge } from "../service/testing.service.js"


export function testController (req, res)  {
        const {name, age} = req.body
        res.status(200).json(sayNameAndAge(name, age))
}

export class Anibal {
        tellMe(req, res) {
                res.status(200).json(`Soy Anibal arará popó`)
        }
}
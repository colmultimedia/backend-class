import { sayNameAndAge } from "../service/testing.service.js"


export function testController (req, res)  {
        const {name, age} = req.body
        res.status(200).json(sayNameAndAge(name, age))
}


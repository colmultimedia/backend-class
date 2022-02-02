import Message from '../model/message.model.js'

export async function saveMessage(msg){

    const newMsg = new Message(msg)
    console.log(await newMsg.save())

}

export async function readMessage(){
    const msg = await Message.find()
    console.log(msg)
    return msg
}
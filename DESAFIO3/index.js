let acumulado = 0
const procesoFinal =  (acumulado) => {
    console.log(`El total acumulado es ${acumulado}`)
}

const letters = async (text, callback, time=1000) => {
    let arr = text.split(" ")
    for (let i = 0; i<arr.length; i++){
        await timmer (time)
        console.log(arr[i])
    }
    callback(`Proceso concluido. Cantidad de palabras en total: ${arr.length}`)
    acumulado = arr.length+acumulado
    
}

const timmer = (ms) => {
    return new Promise ((res, rej) => {
        setTimeout(()=> {
            res()
        },ms)
    })
}

    const orderedWords = async (text1, text2, text3) => {
        try {
            await letters (text1, (word) => {
                console.log(word)
            },)
            await letters (text2, (word) => {
                console.log(word)
            },)
            await letters (text3, (word) => {
                console.log(word)
            })
            procesoFinal(acumulado)

        }catch(err){
        console.log(err)

        }
}   

orderedWords('Mattheuv Osorio', 'Este es el desafio No 3', 'con el uso de split que no entiendo Silvio')
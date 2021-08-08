let consigna = {descripcion: 'en el callback de la funcion letters devuelve solamente el arr.length, crea otra funcion que reciba un parametro y que se llame proceso final, la ejecutas en el ultimo then, luego en cada then creas una variable y vas sumando las palabras que te va devolviendo cada callback y al final le pasas esa variable a la nueva funcion que creaste.'}
console.log(consigna)

const letters = async (text, callback, time=1000) => {
    let arr = text.split(" ")
    for (let i = 0; i<arr.length; i++){
        await timmer (time)
        console.log(ar[i])
    }
    callback()
}
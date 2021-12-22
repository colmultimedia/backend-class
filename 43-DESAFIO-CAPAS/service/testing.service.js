import  fs  from "fs"
export const sayNameAndAge = (name, age) => {
    try{
        if(fs.existsSync('testing.txt')){
            fs.appendFile('testing.txt',  JSON.stringify({nombre: name, edad: age}),(error) =>{
                if(!error){
                    fs.readFile('testing.txt', 'utf-8',(error, data)=>{
                        if (!error){
                            console.log(data)
                        }else{
                            console.console.log(`Error: ${error}`);
                        }
                    })  
                }
            })
        }else{
            fs.writeFile('testing.txt', JSON.stringify({nombre: name, edad: age}) ,(error, data)=>{
                if (!error){
                    console.log('lol');
                    res.json('No existen registros')
                }else{
                    console.console.log(`Error: ${error}`);
                }
            })     
        }

}  catch(err) {
res.status(404).json({err})
}        

    
    return `Su nombre es ${name} y tiene ${age} años`

    
}

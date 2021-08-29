const socket = io()
document.addEventListener('DOMContentLoaded', function() {

    // const template = document.getElementById("template")
    // const toRender = document.getElementById("toRender")
     socket.on("producto", msg => {
         console.log(msg) // recibo el producto
     })

    
     
     // guardarProd.addEventListener("click", (e) => {
         //     socket.emit("producto",{title: title.value, price: price.value, thumbnail: thumb.value}); // To server
         // });
        }) 
        
        function enviarProducto (){
   
            var url = 'http://localhost:5050/api/productos/guardarform';
            
        fetch(url, {
                method: 'POST', // 
                body: JSON.stringify({
                    "title": this.title.value,
                    "price": this.price.value,
                    "thumbnail": this.thumbnail.value
                }), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
                
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                
                .then(response =>  socket.emit("producto", response));
                        
               //mando el producto nuevo.
            }
   

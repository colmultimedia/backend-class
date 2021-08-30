document.addEventListener('DOMContentLoaded', function() {

    const socket = io()
    const guardarProd = document.getElementById("guardarProd")
    const title = document.getElementById("title")
    const price = document.getElementById("price")
    const thumb = document.getElementById("thumbnail")
    // const template = document.getElementById("template")
    // const toRender = document.getElementById("toRender")
     socket.on("producto", msg => {
         console.log(msg)
     })

guardarProd.addEventListener("click", (e) => {
    socket.emit("producto",{title: title.value, price: price.value, thumbnail: thumb.value}); // To server
});
})

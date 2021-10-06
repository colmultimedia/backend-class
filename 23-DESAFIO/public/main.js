var socket = io.connect("http://localhost:8080", { forceNew: true });

window.scrollTo(0, document.getElementById('myChatWindow').scrollHeight);

function renderChat(data) {
  console.log(typeof data)
  var html = data
  .map(function (elem, index) {
    return `<div>
    <p align="left" style="color: brown">
    <strong style="color: blue">${elem.email}</strong>
   ${elem.date}:
    <i style="color: green">${elem.opinion}</i>
    </p>
    </div>`;
  })
  .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", function (data) {
  renderChat(data)
});



function addMensaje() {
  var mensaje = {
    email: document.getElementById("email").value,
    date: new Date(),
    opinion: document.getElementById("opinion").value,
    };
console.log(mensaje)
if(document.getElementById("email").value != 0){

socket.emit("new-mensaje", mensaje);
  return false;
}else
console.log("need email")
}
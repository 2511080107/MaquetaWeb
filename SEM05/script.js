function procesarUsuario(nombre, callback) {
console.log(`Procesando ${nombre}`);
callback(); // se ejecuta inmediatamente después
}

procesarUsuario("Claudio", function () {
console.log("Proceso terminado");
});





console.log("Inicio");

setTimeout(() => {
    console.log("Proceso terminado");
}, 2000);

console.log("Fin");

console.log("Inicio");
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(res => res.json())
    .then(data => console.log("Datos recibidos:", data));

console.log("Fin");
const EMAILJS_PUBLIC_KEY  = "eaGOfWDsP-ES_tu3J";
const EMAILJS_SERVICE_ID  = "service_vln7i6e";
const EMAILJS_TEMPLATE_ID = "template_37n5l8o";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();

    const parametros = {
        nombre: nombre,
        email: email,
        to_email: email
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, parametros)
        .then(function () {
            mensaje.textContent = "Registro exitoso. Por favor, revise su correo electrónico, revise tambien su bandeja de SPAM.";
            mensaje.className = "mensaje-exito";
            form.reset();
        })
        .catch(function (error) {
            mensaje.textContent = "No se pudo enviar el correo. Intente nuevamente.";
            mensaje.className = "mensaje-error";
            console.error("EmailJS error:", error);
        });
});
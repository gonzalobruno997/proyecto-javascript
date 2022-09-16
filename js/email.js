// CONFIGURACION DE LA API PARA EL ENVIO DE EMAIL EXTERNOS A TRAVES DEL FORMULARIO DE CONTACTO DEL SITIO
(function(){
    emailjs.init("b8HmRlESV9TUQBgRQ");
})();
window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let params = {
            nombre: this.nombre,
            correo: this.correo,
            telefono: this.telefono,
            consulta: this.consulta
        }

        emailjs.sendForm('service_111qcoh', 'template_s8u25et', this)
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
        console.log('FAILED...', error);
        });
    });
}
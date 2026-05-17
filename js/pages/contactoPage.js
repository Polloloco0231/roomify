const ContactoPage = {

init() {
    AuthService.init();
    this.bindEvents();
    this.cargarMapa();
},

bindEvents() {
    const form = document.getElementById('contactoForm');
    if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContacto();
    });
    }
},

handleContacto() {
    const datos = {
    nombre: document.getElementById('nombreContacto').value.trim(),
    email: document.getElementById('emailContacto').value.trim(),
    telefono: document.getElementById('telefonoContacto').value.trim(),
    mensaje: document.getElementById('mensajeContacto').value.trim()
    };

    const nombreVal = Validaciones.requerido(datos.nombre, 'nombre');
    if (!nombreVal.ok) {
    Alertas.error(nombreVal.mensaje);
    return;
    }

    const emailVal = Validaciones.email(datos.email);
    if (!emailVal.ok) {
    Alertas.error(emailVal.mensaje);
    return;
    }

    const telefonoVal = Validaciones.telefono(datos.telefono);
    if (!telefonoVal.ok) {
    Alertas.error(telefonoVal.mensaje);
    return;
    }

    const mensajeVal = Validaciones.requerido(datos.mensaje, 'mensaje');
    if (!mensajeVal.ok) {
    Alertas.error(mensajeVal.mensaje);
    return;
    }

    // Simulacion de envio de mensaje
    const mensajes = LocalStorageService.get('mensajes') || [];
    mensajes.push({
    id: 'msg-' + Date.now(),
    ...datos,
    fecha: new Date().toISOString(),
    leido: false
    });
    LocalStorageService.set('mensajes', mensajes);

    Alertas.exito('Mensaje enviado exitosamente, pronto nos pondremos en contacto contigo');
    document.getElementById('contactoForm').reset();
},

cargarMapa() {
    const mapaContainer = document.getElementById('mapaContainer');
    if (!mapaContainer) return;

    mapaContainer.innerHTML = `
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5!2d-73.1198!3d6.9193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMDkuNSJOIDczwrAwNyc2NS4yIlc!5e0!3m2!1ses!2sco!4v1234567890"
        width="100%"
        height="400"
        style="border:0; border-radius: var(--radius-lg);"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>
    `;
}

};

document.addEventListener('DOMContentLoaded', () => ContactoPage.init());
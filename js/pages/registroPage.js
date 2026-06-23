const RegistroPage = {

init() {
    AuthService.init();
    this.bindEvents();
},

bindEvents() {
    const form = document.getElementById('registroForm');
    if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegistro();
    });
    }
},

handleRegistro() {
    const datos = {
        identificacion: document.getElementById('identificacion').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        nacionalidad: document.getElementById('nacionalidad').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        password: document.getElementById('password').value.trim()
    };

    const validacion = Validaciones.validarRegistro(datos);
    if (!validacion.ok) {
        Alertas.error(validacion.mensaje);
        return;
    }

    const confirmarPassword = document.getElementById('confirmarPassword').value.trim();
    if (datos.password !== confirmarPassword) {
        Alertas.error('Las contraseñas no coinciden');
        return;
    }

    const resultado = AuthService.registro(datos);
    if (!resultado.ok) {
        Alertas.error(resultado.mensaje);
        return;
    }

    Alertas.exito('Registro exitoso, redirigiendo al login...');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

};

document.addEventListener('DOMContentLoaded', () => RegistroPage.init());
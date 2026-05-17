const LoginPage = {

    init() {
    AuthService.init();
    this.bindEvents();
},

bindEvents() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();

    });
    }
},

handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const emailVal = Validaciones.email(email);
    if (!emailVal.ok) {
        Alertas.error(emailVal.mensaje);
        return;
    }

    const resultado = AuthService.login(email, password);
    if (!resultado.ok) {
      Alertas.error(resultado.mensaje);
      return;
    }

    Alertas.exito('Bienvenido ' + resultado.usuario.nombre);

    setTimeout(() => {
      if (resultado.usuario.rol === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'index.html';
      }
    }, 1000);
  }

};

document.addEventListener('DOMContentLoaded', () => LoginPage.init());
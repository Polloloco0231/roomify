    const HomePage = {

init() {
    AuthService.init();
    this.actualizarNavbar();

},

actualizarNavbar() {
    const sesion = AuthService.getSesion();
    const btnLogin = document.getElementById('navLogin');
    const btnAdmin = document.getElementById('navAdmin');
    const btnLogout = document.getElementById('navLogout');
    const nombreUsuario = document.getElementById('navNombre');

    if (sesion) {
    if (btnLogin) btnLogin.style.display = 'none';
        if (nombreUsuario) {
        nombreUsuario.style.display = 'block';
        nombreUsuario.textContent = sesion.nombre;
    }
    if (btnLogout) btnLogout.style.display = 'block';
    if (btnAdmin && sesion.rol === 'admin') {
        btnAdmin.style.display = 'block';
    }
} else {
    if (btnLogin) btnLogin.style.display = 'block';
    if (nombreUsuario) nombreUsuario.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'none';
    if (btnAdmin) btnAdmin.style.display = 'none';
    }

    if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        AuthService.logout();
        Alertas.exito('Sesión cerrada');
        setTimeout(() => window.location.reload(), 1000);
    });
    }
}

};

document.addEventListener('DOMContentLoaded', () => HomePage.init());
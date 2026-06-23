document.addEventListener('DOMContentLoaded', () => {
    AuthService.init();


    const sesion = AuthService.getSesion();
    const paginaActual = window.location.pathname.split('/').pop();

    const paginasProtegidas = ['admin.html'];
    const paginasSoloInvitados = ['login.html', 'registro.html'];

    if (paginasProtegidas.includes(paginaActual)) {
    if (!AuthService.isAdmin()) {
        Alertas.error('Acceso denegado');
    setTimeout(() => window.location.href = 'index.html', 1500);
    }
}

if (paginasSoloInvitados.includes(paginaActual)) {
    if (sesion) {
    window.location.href = 'index.html';
    }
}
});
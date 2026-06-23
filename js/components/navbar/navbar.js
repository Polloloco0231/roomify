class NavBar extends HTMLElement {

connectedCallback() {
    this.render();
    this.initMenu();
    this.actualizarSesion();
}

render() {
    this.innerHTML = `
<nav class="navbar">
        <div class="navbar__container">

        <a href="index.html" class="navbar__logo">
            Rincón <br /> 
            <em>del Carmen</em>
        </a>

        <button class="navbar__toggle" id="navToggle" aria-label="Abrir menú">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <ul class="navbar__menu" id="navMenu">
            <li><a href="index.html" class="navbar__link">Inicio</a></li>
            <li><a href="index.html#habitaciones" class="navbar__link">Habitaciones</a></li>
            <li><a href="reservas.html" class="navbar__link">Reservas</a></li>
            <li><a href="contacto.html" class="navbar__link">Contacto</a></li>
            <li class="navbar__menu-auth" id="navMenuAuth">
                <a href="login.html" class="navbar__link navbar__link--auth" id="navMenuLogin">Iniciar Sesión</a>
                <span class="navbar__user navbar__link--auth" id="navMenuNombre" style="display:none"></span>
                <a href="admin.html" class="navbar__link navbar__link--auth" id="navMenuAdmin" style="display:none">Panel Admin</a>
                <button class="navbar__link navbar__link--auth navbar__link--logout" id="navMenuLogout" style="display:none">Cerrar Sesión</button>
            </li>
        </ul>

        <div class="navbar__auth" id="navAuth">
            <a href="login.html" class="btn btn--outline" id="navLogin">Iniciar Sesión</a>
            <span class="navbar__user" id="navNombre" style="display:none"></span>
            <a href="admin.html" class="btn btn--primary" id="navAdmin" style="display:none">Admin</a>
            <button class="btn btn--primary" id="navLogout" style="display:none">Cerrar Sesión</button>
        </div>

        </div>
    </nav>
    `;
}

initMenu() {
    const toggle = this.querySelector('#navToggle');
    const menu = this.querySelector('#navMenu');
    if (toggle && menu) {
    toggle.addEventListener('click', () => {
        menu.classList.toggle('navbar__menu--open');
        toggle.classList.toggle('navbar__toggle--active');
    });
    }
}

actualizarSesion() {
    const sesion = LocalStorageService.get('sesion');

    // Desktop auth
    const btnLogin = this.querySelector('#navLogin');
    const btnAdmin = this.querySelector('#navAdmin');
    const btnLogout = this.querySelector('#navLogout');
    const nombreUsuario = this.querySelector('#navNombre');

    // Mobile auth (inside menu)
    const btnMenuLogin = this.querySelector('#navMenuLogin');
    const btnMenuAdmin = this.querySelector('#navMenuAdmin');
    const btnMenuLogout = this.querySelector('#navMenuLogout');
    const nombreMenuUsuario = this.querySelector('#navMenuNombre');

    if (sesion) {
        // Desktop: hide login, show user name, logout, and admin if applicable
        if (btnLogin) btnLogin.style.display = 'none';
        if (nombreUsuario) {
            nombreUsuario.style.display = 'block';
            nombreUsuario.textContent = '👤 ' + sesion.nombre;
        }
        if (btnLogout) btnLogout.style.display = 'block';
        if (btnAdmin && sesion.rol === 'admin') {
            btnAdmin.style.display = 'block';
        }

        // Mobile: same logic
        if (btnMenuLogin) btnMenuLogin.style.display = 'none';
        if (nombreMenuUsuario) {
            nombreMenuUsuario.style.display = 'block';
            nombreMenuUsuario.textContent = '👤 ' + sesion.nombre;
        }
        if (btnMenuLogout) btnMenuLogout.style.display = 'block';
        if (btnMenuAdmin && sesion.rol === 'admin') {
            btnMenuAdmin.style.display = 'block';
        }
    }

    // Desktop logout
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            LocalStorageService.remove('sesion');
            window.location.href = 'index.html';
        });
    }

    // Mobile logout
    if (btnMenuLogout) {
        btnMenuLogout.addEventListener('click', () => {
            LocalStorageService.remove('sesion');
            window.location.href = 'index.html';
        });
    }
}

}

customElements.define('navbar-component', NavBar);

const AuthService = {

    init() {
    if (!LocalStorageService.get('habitaciones')) {
        LocalStorageService.set('habitaciones', MOCK_DATA.habitaciones);
        LocalStorageService.set('usuarios', MOCK_DATA.usuarios);
        LocalStorageService.set('reservas', MOCK_DATA.reservas);
    }
},

registro(datos) {
    const usuarios = LocalStorageService.get('usuarios');

    const existeEmail = usuarios.find(u => u.email === datos.email);
    if (existeEmail) {
        return { ok: false, mensaje: 'El email ya está registrado' };
    }

    const existeId = usuarios.find(u => u.identificacion === datos.identificacion);
    if (existeId) {
        return { ok: false, mensaje: 'La identificación ya está registrada' };
    }

    const nuevoUsuario = {
        id: 'usr-' + Date.now(),
        identificacion: datos.identificacion,
        nombre: datos.nombre,
        nacionalidad: datos.nacionalidad,
        email: datos.email,
        telefono: datos.telefono,
        password: datos.password,
        rol: 'cliente'
    };

    usuarios.push(nuevoUsuario);
    LocalStorageService.set('usuarios', usuarios);

    return { ok: true, mensaje: 'Registro exitoso' };
},

login(email, password) {
    const usuarios = LocalStorageService.get('usuarios');

    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) {
        return { ok: false, mensaje: 'Email o contraseña incorrectos' };
    }

    LocalStorageService.set('sesion', usuario);
    return { ok: true, usuario };
},

logout() {
    LocalStorageService.remove('sesion');
},

getSesion() {
    return LocalStorageService.get('sesion');
},

isLogueado() {
    return this.getSesion() !== null;
},

isAdmin() {
    const sesion = this.getSesion();
    return sesion && sesion.rol === 'admin';
}

};
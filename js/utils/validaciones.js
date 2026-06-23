const Validaciones = {

requerido(valor, campo) {
    if (!valor || valor.trim() === '') {
        return { ok: false, mensaje: `El campo ${campo} es obligatorio` };
    }
    return { ok: true };
},

email(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
        return { ok: false, mensaje: 'El email no es válido' };
    }
    return { ok: true };
},

telefono(valor) {
    const regex = /^[0-9]{7,10}$/;
    if (!regex.test(valor)) {
        return { ok: false, mensaje: 'El teléfono debe tener entre 7 y 10 dígitos' };
    }
    return { ok: true };
},

password(valor) {
    if (valor.length < 6) {
        return { ok: false, mensaje: 'La contraseña debe tener mínimo 6 caracteres' };
    }
    return { ok: true };
},

identificacion(valor) {
    const regex = /^[0-9]{5,15}$/;
    if (!regex.test(valor)) {
        return { ok: false, mensaje: 'La identificación debe tener entre 5 y 15 dígitos' };
    }
    return { ok: true };
},

validarRegistro(datos) {
    const checks = [
        this.requerido(datos.identificacion, 'identificación'),
        this.identificacion(datos.identificacion),
        this.requerido(datos.nombre, 'nombre'),
        this.requerido(datos.nacionalidad, 'nacionalidad'),
        this.email(datos.email),
        this.telefono(datos.telefono),
        this.password(datos.password)
    ];

    const error = checks.find(c => !c.ok);
    return error || { ok: true };
}

};
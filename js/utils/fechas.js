const FechasUtils = {

calcularNoches(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferencia = fin - inicio;
    return Math.round(diferencia / (1000 * 60 * 60 * 24));
},

formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
},

hoyISO() {
    return new Date().toISOString().split('T')[0];
},

esFechaValida(fechaInicio, fechaFin) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (inicio < hoy) return { ok: false, mensaje: 'La fecha de inicio no puede ser en el pasado' };
    if (fin <= inicio) return { ok: false, mensaje: 'La fecha de fin debe ser después de la fecha de inicio' };

    return { ok: true };
}

};
const ReservasService = {

    getAll() {
    return LocalStorageService.get('reservas');
},

getByUsuario(usuarioId) {
    const reservas = this.getAll();
    return reservas.filter(r => r.usuarioId === usuarioId);
},

haySolapamiento(habitacionId, fechaInicio, fechaFin) {
    const reservas = this.getAll();
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    return reservas.some(r => {
        if (r.habitacionId !== habitacionId) return false;
        if (r.estado === 'cancelada') return false;

        const rInicio = new Date(r.fechaInicio);
        const rFin = new Date(r.fechaFin);

        return inicio < rFin && fin > rInicio;
    });
},

crear(datos) {
    const sesion = AuthService.getSesion();
    if (!sesion) {
        return { ok: false, mensaje: 'Debes iniciar sesión para reservar' };
    }

    const solapamiento = this.haySolapamiento(
        datos.habitacionId,
        datos.fechaInicio,
        datos.fechaFin
    );

    if (solapamiento) {
        return { ok: false, mensaje: 'La habitación no está disponible en esas fechas' };
    }

    const habitacion = HabitacionesService.getById(datos.habitacionId);
    const noches = FechasUtils.calcularNoches(datos.fechaInicio, datos.fechaFin);
    const total = noches * habitacion.precioPorNoche;

    const reserva = {
        id: 'res-' + Date.now(),
        usuarioId: sesion.id,
        usuarioNombre: sesion.nombre,
        habitacionId: datos.habitacionId,
        habitacionNombre: habitacion.nombre,
        fechaInicio: datos.fechaInicio,
        fechaFin: datos.fechaFin,
        personas: datos.personas,
        noches,
        total,
        estado: 'activa',
        fechaCreacion: new Date().toISOString()
    };

    const reservas = this.getAll();
    reservas.push(reserva);
    LocalStorageService.set('reservas', reservas);

    return { ok: true, mensaje: 'Reserva creada exitosamente', reserva };
},

cancelar(reservaId) {
    const reservas = this.getAll();
    const index = reservas.findIndex(r => r.id === reservaId);

    if (index === -1) {
        return { ok: false, mensaje: 'Reserva no encontrada' };
    }

    const sesion = AuthService.getSesion();
    const reserva = reservas[index];

    if (!AuthService.isAdmin() && reserva.usuarioId !== sesion.id) {
        return { ok: false, mensaje: 'No tienes permiso para cancelar esta reserva' };
    }

    reservas[index].estado = 'cancelada';
    LocalStorageService.set('reservas', reservas);

    return { ok: true, mensaje: 'Reserva cancelada exitosamente' };
},

getDisponibles(fechaInicio, fechaFin, personas) {
    const habitaciones = HabitacionesService.filtrar(personas);

    return habitaciones.filter(h => {
        return !this.haySolapamiento(h.id, fechaInicio, fechaFin);
    });
}

};
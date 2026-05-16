const HabitacionesService = {

    getAll() {
    return LocalStorageService.get('habitaciones');
},

getById(id) {
    const habitaciones = this.getAll();
    return habitaciones.find(h => h.id === id);
},

crear(habitacion) {
    const habitaciones = this.getAll();
    const nueva = {
        ...habitacion,
        id: 'hab-' + Date.now(),
        disponible: true
    };
    habitaciones.push(nueva);
    LocalStorageService.set('habitaciones', habitaciones);
    return { ok: true, mensaje: 'Habitación creada exitosamente' };
},

actualizar(id, datos) {
    const habitaciones = this.getAll();
    const index = habitaciones.findIndex(h => h.id === id);
    if (index === -1) {
        return { ok: false, mensaje: 'Habitación no encontrada' };
    }
    habitaciones[index] = { ...habitaciones[index], ...datos };
    LocalStorageService.set('habitaciones', habitaciones);
    return { ok: true, mensaje: 'Habitación actualizada' };
},

eliminar(id) {
    const habitaciones = this.getAll();
    const nuevasHabitaciones = habitaciones.filter(h => h.id !== id);
    LocalStorageService.set('habitaciones', nuevasHabitaciones);
    return { ok: true, mensaje: 'Habitación eliminada' };
},

filtrar(personas) {
    const habitaciones = this.getAll();
    return habitaciones.filter(h => h.maxPersonas >= personas && h.disponible);
}

};
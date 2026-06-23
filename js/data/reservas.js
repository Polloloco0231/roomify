const reservasData = {

init() {
    const reservas = LocalStorageService.get('reservas');
    if (!reservas) {
    LocalStorageService.set('reservas', MOCK_DATA.reservas);
    }
},

getAll() {
    return LocalStorageService.get('reservas');
},

getById(id) {
    return this.getAll().find(r => r.id === id);
},

getByUsuario(usuarioId) {
    return this.getAll().filter(r => r.usuarioId === usuarioId);
},

getActivas() {
    return this.getAll().filter(r => r.estado === 'activa');
},

getCanceladas() {
    return this.getAll().filter(r => r.estado === 'cancelada');
}

};
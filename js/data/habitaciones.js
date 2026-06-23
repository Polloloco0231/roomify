const habitacionesData = {

init() {
    const habitaciones = LocalStorageService.get('habitaciones');
    if (!habitaciones) {
    LocalStorageService.set('habitaciones', MOCK_DATA.habitaciones);
    }
},

getAll() {
    return LocalStorageService.get('habitaciones');
},

getById(id) {
    return this.getAll().find(h => h.id === id);
}

};
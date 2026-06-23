const usuariosData = {

init() {
    const usuarios = LocalStorageService.get('usuarios');
    if (!usuarios) {
    LocalStorageService.set('usuarios', MOCK_DATA.usuarios);
    }
},

getAll() {
    return LocalStorageService.get('usuarios');
},

getById(id) {
    return this.getAll().find(u => u.id === id);
},

getByEmail(email) {
    return this.getAll().find(u => u.email === email);
}

};
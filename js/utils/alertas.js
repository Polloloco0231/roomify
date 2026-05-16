const Alertas = {

toast(mensaje, tipo = 'info', duracion = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast--${tipo}`;
    toast.textContent = mensaje;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('toast--visible'), 10);
    setTimeout(() => {
        toast.classList.remove('toast--visible');
        setTimeout(() => toast.remove(), 300);
    }, duracion);
},

exito(mensaje) {
    this.toast(mensaje, 'success');
},

error(mensaje) {
    this.toast(mensaje, 'error');
},

advertencia(mensaje) {
    this.toast(mensaje, 'warning');
},

info(mensaje) {
    this.toast(mensaje, 'info');
},

confirmar(mensaje) {
    return confirm(mensaje);
}

};
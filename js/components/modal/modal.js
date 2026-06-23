class Modal extends HTMLElement {

connectedCallback() {
    this.render();
    this.bindEvents();
}

render() {
    this.innerHTML = `
    <div class="modal-overlay" id="modalOverlay">
        <div class="modal">
        <button class="modal__close" id="modalClose">✕</button>
        <div class="modal__content" id="modalContent"></div>
        </div>
    </div>
    `;
}

bindEvents() {
    const overlay = this.querySelector('#modalOverlay');
    const btnClose = this.querySelector('#modalClose');

    btnClose.addEventListener('click', () => this.cerrar());
    overlay.addEventListener('click', (e) => {
    if (e.target === overlay) this.cerrar();
    });
}

abrir(contenido) {
    const modalContent = this.querySelector('#modalContent');
    const overlay = this.querySelector('#modalOverlay');
    modalContent.innerHTML = contenido;
    overlay.classList.add('modal-overlay--active');
    document.body.style.overflow = 'hidden';
}

cerrar() {
    const overlay = this.querySelector('#modalOverlay');
    overlay.classList.remove('modal-overlay--active');
    document.body.style.overflow = '';
}

}

customElements.define('modal-component', Modal);
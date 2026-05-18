class RoomCard extends HTMLElement {

static get observedAttributes() {
    return ['habitacion-id'];
}

connectedCallback() {
    const id = this.getAttribute('habitacion-id');
    if (id) {
        const habitacion = HabitacionesService.getById(id);
        if (habitacion) this.render(habitacion);
    }
}

render(h) {
    this.innerHTML = `
    <div class="room-card">
        <div class="room-card__image-wrapper">
        <img src="${h.imagen}" alt="${h.nombre}" class="room-card__image" loading="lazy"/>
        <span class="room-card__badge">${FormatearPrecio.cops(h.precioPorNoche)} / noche</span>
        </div>
        <div class="room-card__body">
        <h3 class="room-card__title">${h.nombre}</h3>
        <p class="room-card__info">🛏 ${h.camas} cama(s) · 👥 Máx. ${h.maxPersonas} personas</p>
        <div class="room-card__servicios">
            ${h.servicios.internet ? '<span class="servicio-tag">Internet</span>' : ''}
            ${h.servicios.minibar ? '<span class="servicio-tag">Minibar</span>' : ''}
            ${h.servicios.jacuzzi ? '<span class="servicio-tag">Jacuzzi</span>' : ''}
            ${h.servicios.tv ? '<span class="servicio-tag">TV</span>' : ''}
            ${h.servicios.aireAcondicionado ? '<span class="servicio-tag">Aire</span>' : ''}
        </div>
        <a href="reservas.html" class="btn btn--primary btn--full">
            Ver Disponibilidad
        </a>
        </div>
    </div>
    `;
}

}

customElements.define('room-card', RoomCard);
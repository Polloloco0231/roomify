class CarruselHabitaciones extends HTMLElement {

connectedCallback() {
    AuthService.init();
    const habitaciones = HabitacionesService.getAll();
    this.render(habitaciones);
    this.initControles();
}

render(habitaciones) {
    this.innerHTML = `
        <div class="carrusel">
        <div class="carrusel__track" id="carruselTrack">
        ${habitaciones.map((h, index) => `
            <div class="carrusel__slide ${index === 0 ? 'carrusel__slide--active' : ''}">
            <div class="carrusel__card">
                <div class="carrusel__image-wrapper">
                <img src="${h.imagen}" alt="${h.nombre}" class="carrusel__image" loading="lazy"/>
                </div>
                <div class="carrusel__content">
                <h3 class="carrusel__title">${h.nombre}</h3>
                <p class="carrusel__info">🛏 ${h.camas} cama(s) · 👥 Máx. ${h.maxPersonas} personas</p>
                <div class="carrusel__servicios">
                    ${h.servicios.internet ? '<span class="servicio-tag">Internet</span>' : ''}
                    ${h.servicios.minibar ? '<span class="servicio-tag">Minibar</span>' : ''}
                    ${h.servicios.jacuzzi ? '<span class="servicio-tag">Jacuzzi</span>' : ''}
                    ${h.servicios.tv ? '<span class="servicio-tag">TV</span>' : ''}
                    ${h.servicios.aireAcondicionado ? '<span class="servicio-tag">Aire</span>' : ''}
                </div>
                <p class="carrusel__precio">
                    Desde ${FormatearPrecio.cops(h.precioPorNoche)} <span>/ noche</span>
            </p>
                <a href="reservas.html" class="btn btn--primary">Ver Disponibilidad</a>
                </div>
            </div>
            </div>
        `).join('')}
        </div>

        <button class="carrusel__btn carrusel__btn--prev" id="btnPrev">&#10094;</button>
        <button class="carrusel__btn carrusel__btn--next" id="btnNext">&#10095;</button>

        <div class="carrusel__dots" id="carruselDots">
        ${habitaciones.map((_, index) => `
            <button class="carrusel__dot ${index === 0 ? 'carrusel__dot--active' : ''}" 
            data-index="${index}">
            </button>
        `).join('')}
        </div>

    </div>
    `;
}

initControles() {
    let actual = 0;
    const slides = this.querySelectorAll('.carrusel__slide');
    const dots = this.querySelectorAll('.carrusel__dot');
    const total = slides.length;

    const irA = (index) => {
    slides[actual].classList.remove('carrusel__slide--active');
    dots[actual].classList.remove('carrusel__dot--active');
    actual = (index + total) % total;
    slides[actual].classList.add('carrusel__slide--active');
    dots[actual].classList.add('carrusel__dot--active');
    };

    this.querySelector('#btnNext').addEventListener('click', () => irA(actual + 1));
    this.querySelector('#btnPrev').addEventListener('click', () => irA(actual - 1));

    dots.forEach((dot, index) => {
    dot.addEventListener('click', () => irA(index));
    });

    setInterval(() => irA(actual + 1), 4000);
}

}

customElements.define('carrusel-habitaciones', CarruselHabitaciones);
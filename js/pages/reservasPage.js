const ReservasPage = {

init() {
    AuthService.init();
    this.bindEvents();
    this.setFechasMinimas();
    this.leerParametrosURL();
    this.mostrarMisReservas();
},
leerParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    const fechaInicio = params.get('fechaInicio');
    const fechaFin = params.get('fechaFin');
    const personas = params.get('personas');

    if (fechaInicio && fechaFin && personas) {
    document.getElementById('fechaInicio').value = fechaInicio;
    document.getElementById('fechaFin').value = fechaFin;
    document.getElementById('personas').value = personas;
    this.buscarDisponibilidad();
}
},

setFechasMinimas() {
    const hoy = FechasUtils.hoyISO();
    const inputInicio = document.getElementById('fechaInicio');
    const inputFin = document.getElementById('fechaFin');
    if (inputInicio) inputInicio.min = hoy;
    if (inputFin) inputFin.min = hoy;
},

bindEvents() {
    const form = document.getElementById('busquedaForm');
    if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.buscarDisponibilidad();
    });
    }
},

buscarDisponibilidad() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const personas = parseInt(document.getElementById('personas').value);

    const validacion = FechasUtils.esFechaValida(fechaInicio, fechaFin);
    if (!validacion.ok) {
    Alertas.error(validacion.mensaje);
        return;
    }

    if (!personas || personas < 1) {
        Alertas.error('Ingresa el número de personas');
    return;
    }

    const disponibles = ReservasService.getDisponibles(fechaInicio, fechaFin, personas);

    if (disponibles.length === 0) {
    Alertas.advertencia('No hay habitaciones disponibles para esas fechas y número de personas');
    this.renderHabitaciones([]);
    return;
    }

    const noches = FechasUtils.calcularNoches(fechaInicio, fechaFin);
    this.renderHabitaciones(disponibles, fechaInicio, fechaFin, noches);
},

renderHabitaciones(habitaciones, fechaInicio, fechaFin, noches) {
    const contenedor = document.getElementById('habitacionesContainer');
    if (!contenedor) return;

    if (habitaciones.length === 0) {
        contenedor.innerHTML = '<p class="no-results">No hay habitaciones disponibles</p>';
        return;
    }

    contenedor.innerHTML = habitaciones.map(h => `
        <div class="room-card">
        <img src="${h.imagen}" alt="${h.nombre}" class="room-card__image"/>
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
        <div class="room-card__precio">
            <span>${FormatearPrecio.cops(h.precioPorNoche)} / noche</span>
            <strong>Total ${noches} noche(s): ${FormatearPrecio.cops(h.precioPorNoche * noches)}</strong>
            </div>
            <button 
        class="btn btn--primary" 
            onclick="ReservasPage.reservar('${h.id}', '${fechaInicio}', '${fechaFin}', ${noches})">
            Reservar
        </button>
        </div>
    </div>
    `).join('');
},

reservar(habitacionId, fechaInicio, fechaFin, noches) {
    if (!AuthService.isLogueado()) {
    Alertas.error('Debes iniciar sesión para reservar');
    setTimeout(() => window.location.href = 'login.html', 1500);
    return;
    }

    const personas = parseInt(document.getElementById('personas').value);
    const resultado = ReservasService.crear({
    habitacionId,
    fechaInicio,
    fechaFin,
    personas
    });

    if (!resultado.ok) {
    Alertas.error(resultado.mensaje);
        return;
    }

    Alertas.exito(resultado.mensaje);
    this.mostrarMisReservas();
    setTimeout(() => this.buscarDisponibilidad(), 1500);
},

mostrarMisReservas() {
    const sesion = AuthService.getSesion();

    if (!sesion) return;

    const reservas = ReservasService.getByUsuario(sesion.id);

    const section = document.getElementById('misReservas');
    const container = document.getElementById('misReservasContainer');
    const contador = document.getElementById('contadorReservas');

    section.style.display = 'block';

    contador.textContent = `${reservas.length} reserva(s)`;

    if (reservas.length === 0) {
        container.innerHTML = `
            <div class="mis-reservas__empty">
                <p class="mis-reservas__empty-text">
                    Aún no tienes reservas.
                </p>
            </div>
        `;
        return;
    }

    container.innerHTML = reservas.map(r => `
        <div class="room-card">
            <div class="room-card__body">
                <h3 class="room-card__title">${r.habitacionNombre}</h3>

                <p><strong>Entrada:</strong> ${r.fechaInicio}</p>
                <p><strong>Salida:</strong> ${r.fechaFin}</p>
                <p><strong>Personas:</strong> ${r.personas}</p>
                <p><strong>Noches:</strong> ${r.noches}</p>
                <p><strong>Total:</strong> ${FormatearPrecio.cops(r.total)}</p>

                <p>
                    <strong>Estado:</strong> 
                    ${r.estado}
                </p>

                <button 
                    class="btn btn--danger"
                    onclick="ReservasPage.eliminarReserva('${r.id}')"
                >
                    Cancelar Reserva
                </button>
            </div>
        </div>
    `).join('');
},

eliminarReserva(idReserva) {

    const confirmar = confirm(
        '¿Seguro que deseas cancelar esta reserva?'
    );

    if (!confirmar) return;

    const reservas = Storage.get(STORAGE_KEYS.RESERVAS) || [];

    const nuevasReservas = reservas.filter(
        r => r.id !== idReserva
    );

    Storage.set(STORAGE_KEYS.RESERVAS, nuevasReservas);

    Alertas.exito('Reserva cancelada correctamente');

    this.mostrarMisReservas();

    this.buscarDisponibilidad();
}
};

document.addEventListener('DOMContentLoaded', () => ReservasPage.init());
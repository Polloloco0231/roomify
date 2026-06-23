class ReservaForm extends HTMLElement {

connectedCallback() {
    this.render();
    this.bindEvents();
}

render() {
    const hoy = FechasUtils.hoyISO();
    this.innerHTML = `
    <div class="reserva-form">
        <h3 class="reserva-form__title">Consultar Disponibilidad</h3>
        <form id="reservaFormComponent">

        <div class="form-group">
            <label class="form-label">Fecha de entrada</label>
            <input type="date" id="rfFechaInicio" class="form-input" min="${hoy}" required/>
        </div>

        <div class="form-group">
            <label class="form-label">Fecha de salida</label>
            <input type="date" id="rfFechaFin" class="form-input" min="${hoy}" required/>
        </div>

        <div class="form-group">
            <label class="form-label">Número de personas</label>
            <input type="number" id="rfPersonas" class="form-input" min="1" max="10" placeholder="¿Cuántos?" required/>
        </div>

        <button type="submit" class="btn btn--primary btn--full">
            Buscar Habitaciones
        </button>

        </form>
    </div>
    `;
}

bindEvents() {
    const form = this.querySelector('#reservaFormComponent');
    if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleBusqueda();
    });
    }
}

handleBusqueda() {
    const fechaInicio = this.querySelector('#rfFechaInicio').value;
    const fechaFin = this.querySelector('#rfFechaFin').value;
    const personas = parseInt(this.querySelector('#rfPersonas').value);

    const validacion = FechasUtils.esFechaValida(fechaInicio, fechaFin);
    if (!validacion.ok) {
            Alertas.error(validacion.mensaje);
            return;
    }

    if (!personas || personas < 1) {
        Alertas.error('Ingresa el número de personas');
    return;
    }

    const params = new URLSearchParams({ fechaInicio, fechaFin, personas });
    window.location.href = `reservas.html?${params}`;
}

}

customElements.define('reserva-form', ReservaForm);
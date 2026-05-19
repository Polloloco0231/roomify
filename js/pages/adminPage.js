const AdminPage = {

  // ── Estado interno ─────────────────────────────────────────────
  _confirmCallback: null,

  // ── Init ───────────────────────────────────────────────────────
  init() {
    AuthService.init();

    // Verificar que sea admin
    if (!AuthService.isLogueado() || !AuthService.isAdmin()) {
      alert('Acceso denegado. Debes iniciar sesión como administrador.');
      window.location.href = 'login.html';
      return;
    }

    this.cargarInfoAdmin();
    this.cargarDashboard();
  },

  // ── Info del admin en sidebar ──────────────────────────────────
  cargarInfoAdmin() {
    const sesion = AuthService.getSesion();
    if (!sesion) return;

    const avatar = document.getElementById('adminAvatar');
    const nombre = document.getElementById('adminNombre');

    if (avatar) avatar.textContent = sesion.nombre.charAt(0).toUpperCase();
    if (nombre) nombre.textContent = sesion.nombre;
  },

  // ── Navegación entre secciones ─────────────────────────────────
  mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    const secciones = ['Dashboard', 'Habitaciones', 'Reservas', 'Usuarios'];
    secciones.forEach(s => {
      const el = document.getElementById(`seccion${s}`);
      if (el) el.style.display = 'none';
    });

    // Quitar active de todos los botones
    document.querySelectorAll('.admin-sidebar__nav-item').forEach(btn => {
      btn.classList.remove('active');
    });

    // Mostrar sección seleccionada
    const nombre = seccion.charAt(0).toUpperCase() + seccion.slice(1);
    const target = document.getElementById(`seccion${nombre}`);
    if (target) target.style.display = 'block';

    // Marcar botón activo
    const btnActivo = document.getElementById(`btnNav${nombre}`);
    if (btnActivo) btnActivo.classList.add('active');

    // Actualizar breadcrumb
    const breadcrumb = document.getElementById('breadcrumbActual');
    if (breadcrumb) breadcrumb.textContent = nombre;

    // Cargar datos de la sección
    if (seccion === 'dashboard')    this.cargarDashboard();
    if (seccion === 'habitaciones') this.cargarTablaHabitaciones();
    if (seccion === 'reservas')     this.cargarTablaReservas();
    if (seccion === 'usuarios')     this.cargarTablaUsuarios();
  },

  // ── Toggle sidebar móvil ───────────────────────────────────────
  toggleSidebar() {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) sidebar.classList.toggle('open');
  },

  // ── Cerrar sesión ──────────────────────────────────────────────
  cerrarSesion() {
    AuthService.logout();
    window.location.href = 'login.html';
  },

  // ════════════════════════════════════════════════════════════════
  // DASHBOARD
  // ════════════════════════════════════════════════════════════════
  cargarDashboard() {
    const habitaciones = HabitacionesService.getAll() || [];
    const reservas     = ReservasService.getAll()     || [];
    const usuarios     = LocalStorageService.get('usuarios') || [];

    // Reservas activas
    const reservasActivas = reservas.filter(r => r.estado === 'activa');

    // Habitaciones disponibles hoy
    const hoy = FechasUtils.hoyISO();
    const disponiblesHoy = habitaciones.filter(h => {
      return !ReservasService.haySolapamiento(h.id, hoy, hoy + 'T23:59');
    });

    // Stats
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setVal('statHabitaciones', habitaciones.length);
    setVal('statReservas',     reservasActivas.length);
    setVal('statUsuarios',     usuarios.filter(u => u.rol !== 'admin').length);
    setVal('statDisponibles',  disponiblesHoy.length);

    // Badge sidebar
    const badge = document.getElementById('badgeReservas');
    if (badge) badge.textContent = reservasActivas.length;

    // Tabla reservas recientes (últimas 5)
    const recientes = [...reservas]
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, 5);

    this._renderTablaReservas('tablaReservasRecientes', recientes, true);
  },

  // ════════════════════════════════════════════════════════════════
  // HABITACIONES
  // ════════════════════════════════════════════════════════════════
  cargarTablaHabitaciones(filtro = '') {
    let habitaciones = HabitacionesService.getAll() || [];

    if (filtro) {
      const f = filtro.toLowerCase();
      habitaciones = habitaciones.filter(h =>
        h.nombre.toLowerCase().includes(f)
      );
    }

    const tbody = document.getElementById('tablaHabitaciones');
    if (!tbody) return;

    if (habitaciones.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--color-gray); padding:var(--space-8);">No hay habitaciones registradas</td></tr>`;
      return;
    }

    tbody.innerHTML = habitaciones.map(h => {
      const serviciosIcons = [
        h.servicios?.internet          ? '📶'  : '',
        h.servicios?.minibar           ? '🍷'  : '',
        h.servicios?.jacuzzi           ? '🛁'  : '',
        h.servicios?.tv                ? '📺'  : '',
        h.servicios?.aireAcondicionado ? '❄️'  : '',
        h.servicios?.cajaFuerte        ? '🔒'  : '',
      ].filter(Boolean).join(' ');

      return `
        <tr>
          <td>
            <div class="admin-table__room-info">
              <img src="${h.imagen || 'assets/images/hotel/hotel-inicio.jpg'}"
                   alt="${h.nombre}" class="admin-table__img" />
              <div class="admin-table__room-details">
                <span class="admin-table__room-name">${h.nombre}</span>
                <span class="admin-table__room-type">ID: ${h.id}</span>
              </div>
            </div>
          </td>
          <td>${h.camas} cama(s)</td>
          <td>👥 ${h.maxPersonas} personas</td>
          <td><strong>${FormatearPrecio.cops(h.precioPorNoche)}</strong></td>
          <td>${serviciosIcons || '—'}</td>
          <td>
            <span class="badge ${h.disponible ? 'badge--available' : 'badge--unavailable'}">
              ${h.disponible ? 'Disponible' : 'No disponible'}
            </span>
          </td>
          <td>
            <div class="admin-table__actions">
              <button class="btn btn--outline btn--sm"
                onclick="AdminPage.abrirModalHabitacion('${h.id}')">
                ✏️ Editar
              </button>
              <button class="btn btn--danger btn--sm"
                onclick="AdminPage.eliminarHabitacion('${h.id}')">
                🗑️
              </button>
            </div>
          </td>
        </tr>`;
    }).join('');
  },

  filtrarHabitaciones(valor) {
    this.cargarTablaHabitaciones(valor);
  },

  // ── Modal habitación ───────────────────────────────────────────
  abrirModalHabitacion(id = null) {
    const modal  = document.getElementById('modalHabitacion');
    const titulo = document.getElementById('modalHabitacionTitulo');
    if (!modal) return;

    // Limpiar form
    document.getElementById('formHabitacion').reset();
    document.getElementById('habitacionId').value = '';

    if (id) {
      // Modo edición
      const h = HabitacionesService.getById(id);
      if (!h) return;

      titulo.textContent = 'Editar Habitación';
      document.getElementById('habitacionId').value          = h.id;
      document.getElementById('habitacionNombre').value      = h.nombre;
      document.getElementById('habitacionCamas').value       = h.camas;
      document.getElementById('habitacionMaxPersonas').value = h.maxPersonas;
      document.getElementById('habitacionPrecio').value      = h.precioPorNoche;
      document.getElementById('habitacionImagen').value      = h.imagen || '';
      document.getElementById('habitacionDescripcion').value = h.descripcion || '';

      // Checkboxes servicios
      if (h.servicios) {
        const checks = {
          servicioInternet:   h.servicios.internet,
          servicioMinibar:    h.servicios.minibar,
          servicioJacuzzi:    h.servicios.jacuzzi,
          servicioTV:         h.servicios.tv,
          servicioAire:       h.servicios.aireAcondicionado,
          servicioCajaFuerte: h.servicios.cajaFuerte,
        };
        Object.entries(checks).forEach(([elId, val]) => {
          const el = document.getElementById(elId);
          if (el) el.checked = !!val;
        });
      }
    } else {
      titulo.textContent = 'Nueva Habitación';
    }

    modal.classList.add('open');
  },

  cerrarModalHabitacion() {
    const modal = document.getElementById('modalHabitacion');
    if (modal) modal.classList.remove('open');
  },

  guardarHabitacion() {
    const id          = document.getElementById('habitacionId').value;
    const nombre      = document.getElementById('habitacionNombre').value.trim();
    const camas       = parseInt(document.getElementById('habitacionCamas').value);
    const maxPersonas = parseInt(document.getElementById('habitacionMaxPersonas').value);
    const precio      = parseFloat(document.getElementById('habitacionPrecio').value);
    const imagen      = document.getElementById('habitacionImagen').value.trim();
    const descripcion = document.getElementById('habitacionDescripcion').value.trim();

    // Validaciones
    if (!nombre || !camas || !maxPersonas || !precio) {
      Alertas.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const datos = {
      nombre,
      camas,
      maxPersonas,
      precioPorNoche: precio,
      imagen: imagen || 'assets/images/hotel/hotel-inicio.jpg',
      descripcion,
      disponible: true,
      servicios: {
        internet:          document.getElementById('servicioInternet')?.checked   || false,
        minibar:           document.getElementById('servicioMinibar')?.checked    || false,
        jacuzzi:           document.getElementById('servicioJacuzzi')?.checked    || false,
        tv:                document.getElementById('servicioTV')?.checked         || false,
        aireAcondicionado: document.getElementById('servicioAire')?.checked       || false,
        cajaFuerte:        document.getElementById('servicioCajaFuerte')?.checked || false,
      }
    };

    let resultado;
    if (id) {
      resultado = HabitacionesService.actualizar(id, datos);
    } else {
      resultado = HabitacionesService.crear(datos);
    }

    if (!resultado.ok) {
      Alertas.error(resultado.mensaje);
      return;
    }

    Alertas.exito(resultado.mensaje);
    this.cerrarModalHabitacion();
    this.cargarTablaHabitaciones();
    this.cargarDashboard();
  },

  eliminarHabitacion(id) {
    this._confirmCallback = () => {
      const resultado = HabitacionesService.eliminar(id);
      if (resultado.ok) {
        Alertas.exito(resultado.mensaje);
        this.cargarTablaHabitaciones();
        this.cargarDashboard();
      } else {
        Alertas.error(resultado.mensaje);
      }
    };

    this._abrirModalConfirmar(
      '⚠️',
      '¿Eliminar habitación?',
      'Esta acción no se puede deshacer. La habitación será eliminada permanentemente.'
    );
  },

  // ════════════════════════════════════════════════════════════════
  // RESERVAS
  // ════════════════════════════════════════════════════════════════
  cargarTablaReservas(filtro = '') {
    let reservas = ReservasService.getAll() || [];

    if (filtro) {
      const f = filtro.toLowerCase();
      reservas = reservas.filter(r =>
        r.usuarioNombre?.toLowerCase().includes(f) ||
        r.habitacionNombre?.toLowerCase().includes(f) ||
        r.id?.toLowerCase().includes(f)
      );
    }

    this._renderTablaReservas('tablaReservas', reservas, false);
  },

  _renderTablaReservas(tbodyId, reservas, compacto) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    if (reservas.length === 0) {
      const cols = compacto ? 7 : 9;
      tbody.innerHTML = `<tr><td colspan="${cols}" style="text-align:center; color:var(--color-gray); padding:var(--space-8);">No hay reservas registradas</td></tr>`;
      return;
    }

    tbody.innerHTML = reservas.map(r => {
      const estadoBadge = r.estado === 'activa'
        ? '<span class="badge badge--available">Activa</span>'
        : '<span class="badge badge--unavailable">Cancelada</span>';

      const acciones = r.estado === 'activa'
        ? `<button class="btn btn--danger btn--sm"
             onclick="AdminPage.cancelarReserva('${r.id}')">
             Cancelar
           </button>`
        : '—';

      if (compacto) {
        return `
          <tr>
            <td style="font-size:var(--fs-xs); color:var(--color-gray);">${r.id}</td>
            <td>${r.usuarioNombre || '—'}</td>
            <td>${r.habitacionNombre || '—'}</td>
            <td>${FechasUtils.formatearFecha(r.fechaInicio)}</td>
            <td>${FechasUtils.formatearFecha(r.fechaFin)}</td>
            <td>${estadoBadge}</td>
            <td>${acciones}</td>
          </tr>`;
      }

      return `
        <tr>
          <td style="font-size:var(--fs-xs); color:var(--color-gray);">${r.id}</td>
          <td>${r.usuarioNombre || '—'}</td>
          <td>${r.habitacionNombre || '—'}</td>
          <td>${FechasUtils.formatearFecha(r.fechaInicio)}</td>
          <td>${FechasUtils.formatearFecha(r.fechaFin)}</td>
          <td>👥 ${r.personas}</td>
          <td><strong>${FormatearPrecio.cops(r.total)}</strong></td>
          <td>${estadoBadge}</td>
          <td>${acciones}</td>
        </tr>`;
    }).join('');
  },

  filtrarReservas(valor) {
    this.cargarTablaReservas(valor);
  },

  cancelarReserva(reservaId) {
    this._confirmCallback = () => {
      const resultado = ReservasService.cancelar(reservaId);
      if (resultado.ok) {
        Alertas.exito(resultado.mensaje);
        this.cargarTablaReservas();
        this.cargarDashboard();
      } else {
        Alertas.error(resultado.mensaje);
      }
    };

    this._abrirModalConfirmar(
      '⚠️',
      '¿Cancelar esta reserva?',
      'La habitación quedará disponible nuevamente para otras fechas.'
    );
  },

  // ════════════════════════════════════════════════════════════════
  // USUARIOS
  // ════════════════════════════════════════════════════════════════
  cargarTablaUsuarios(filtro = '') {
    let usuarios = LocalStorageService.get('usuarios') || [];
    const reservas = ReservasService.getAll() || [];

    // Excluir admin de la lista
    usuarios = usuarios.filter(u => u.rol !== 'admin');

    if (filtro) {
      const f = filtro.toLowerCase();
      usuarios = usuarios.filter(u =>
        u.nombre?.toLowerCase().includes(f) ||
        u.email?.toLowerCase().includes(f)  ||
        u.identificacion?.toLowerCase().includes(f)
      );
    }

    const tbody = document.getElementById('tablaUsuarios');
    if (!tbody) return;

    if (usuarios.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--color-gray); padding:var(--space-8);">No hay usuarios registrados</td></tr>`;
      return;
    }

    tbody.innerHTML = usuarios.map(u => {
      const numReservas = reservas.filter(r =>
        r.usuarioId === u.id && r.estado === 'activa'
      ).length;

      return `
        <tr>
          <td><strong>${u.nombre}</strong></td>
          <td>${u.identificacion}</td>
          <td>${u.email}</td>
          <td>${u.telefono}</td>
          <td>${u.nacionalidad}</td>
          <td><span class="badge badge--featured">Cliente</span></td>
          <td>
            <span class="badge ${numReservas > 0 ? 'badge--available' : ''}">
              ${numReservas} activa(s)
            </span>
          </td>
        </tr>`;
    }).join('');
  },

  filtrarUsuarios(valor) {
    this.cargarTablaUsuarios(valor);
  },

  // ════════════════════════════════════════════════════════════════
  // MODAL CONFIRMACIÓN
  // ════════════════════════════════════════════════════════════════
  _abrirModalConfirmar(icono, titulo, texto) {
    const modal = document.getElementById('modalConfirmar');
    if (!modal) return;

    const elIcono  = document.getElementById('confirmIcon');
    const elTitulo = document.getElementById('confirmTitulo');
    const elTexto  = document.getElementById('confirmTexto');

    if (elIcono)  elIcono.textContent  = icono;
    if (elTitulo) elTitulo.textContent = titulo;
    if (elTexto)  elTexto.textContent  = texto;

    modal.classList.add('open');
  },

  cerrarModalConfirmar() {
    const modal = document.getElementById('modalConfirmar');
    if (modal) modal.classList.remove('open');
    this._confirmCallback = null;
  },

  ejecutarConfirmacion() {
    if (typeof this._confirmCallback === 'function') {
      this._confirmCallback();
    }
    this.cerrarModalConfirmar();
  }

};

document.addEventListener('DOMContentLoaded', () => AdminPage.init());
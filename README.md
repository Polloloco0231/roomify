# 🏨 Roomify — Hotel El Rincón del Carmen

Este fue el proyecto desarrollado como trabajo para la materia de *JavaScript*, y consiste en la construcción de un sitio web completo y funcional para el **Hotel El Rincón del Carmen**,

El sitio web cuenta con una landing page atractiva y responsive, un sistema completo de reservas con validación de disponibilidad y prevención de solapamiento de fechas, autenticación de usuarios con roles diferenciados (cliente y administrador), un panel de gestión para el administrador, y una página de contacto con formulario y mapa integrado. Todo el proyecto está basado en una simulación de base de datos usando **LocalStorage**, sin necesidad de backend ni servidor externo.

El proyecto fue desarrollado en **parejas**, segun se nos fue indicado, el trabajo esta dividido de forma estratégica según las responsabilidades de cada integrante. Usamos **Git y GitHub** como herramienta de control de versiones, trabajando con un flujo de ramas profesional donde cada funcionalidad fue desarrollada en su propia rama y luego integrada a la rama `develop`:

![ramas](documentacion/ramas.jpg)

- `feature/storage` — Capa de almacenamiento, servicios base y datos iniciales
- `feature/auth` — Sistema de autenticación, registro e inicio de sesión
- `feature/reservas` — Lógica de reservas, disponibilidad y anti-solapamiento
- `feature/admin` — Panel de administración de habitaciones y reservas
- `feature/components` — Web Components reutilizables: navbar, footer, carrusel, modal, room-card y reserva-form
- `feature/home` — Landing page y página principal
- `feature/contacto` — Página de contacto y formulario


##  Tecnologías utilizadas

- **HTML5** — Estructura semántica de las páginas
- **CSS3** — Diseño responsivo y variables CSS
- **JavaScript ES6+** — Lógica del negocio y gestión de datos
- **Web Components** — Modularización de la interfaz (Vanilla JS)
- **LocalStorage** — Simulación de base de datos en el navegador



##  Cómo correr el proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/Polloloco0231/roomify.git
```

2. Abre la carpeta en VS Code:
```bash
cd roomify
code .
```

3. Instala la extensión **Live Server** en VS Code

4. Click derecho sobre `index.html` → **Open with Live Server**

5. El sitio abrirá automáticamente en el navegador


##  Credenciales de prueba

### Administrador
| Campo | Valor |
|-------|-------|
| Email | admin@hotelcarmen.com |
| Contraseña | admin123 |

### Cliente
Puedes registrarte desde `registro.html` con cualquier dato válido.

---

## 📁 Estructura del proyecto

![estructura](documentacion/estructura.jpg)
![estructuraa](documentacion/estructuraa.jpg)


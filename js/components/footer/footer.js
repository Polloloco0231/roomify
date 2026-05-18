class Footer extends HTMLElement {

connectedCallback() {
    this.render();
}

render() {
    this.innerHTML = `
    <footer class="footer">
        <div class="footer__container">

        <div class="footer__brand">
            <h3 class="footer__logo">Rincón del Carmen</h3>
            <p class="footer__desc">Un lugar donde el descanso y la elegancia se encuentran. Te esperamos para brindarte la mejor experiencia.</p>
        </div>

        <div class="footer__links">
            <h4 class="footer__title">Navegación</h4>
            <ul class="footer__list">
            <li><a href="index.html" class="footer__link">Inicio</a></li>
            <li><a href="reservas.html" class="footer__link">Reservas</a></li>
            <li><a href="contacto.html" class="footer__link">Contacto</a></li>
            </ul>
        </div>

        <div class="footer__contact">
            <h4 class="footer__title">Contacto</h4>
            <ul class="footer__list">
            <li>📍 Bucaramanga, Santander</li>
            <li>📞 +57 300 000 0000</li>
            <li>✉️ info@hotelcarmen.com</li>
            </ul>
        </div>

        <div class="footer__social">
            <h4 class="footer__title">Síguenos</h4>
            <div class="footer__social-links">
            <a href="#" class="footer__social-link">📘 Facebook</a>
            <a href="#" class="footer__social-link">📸 Instagram</a>
            <a href="#" class="footer__social-link">🐦 Twitter</a>
            </div>
        </div>

        </div>

        <div class="footer__bottom">
        <p>© 2026 Hotel El Rincón del Carmen. Todos los derechos reservados.</p>
        </div>

    </footer>
    `;
}

}

customElements.define('footer-component', Footer);
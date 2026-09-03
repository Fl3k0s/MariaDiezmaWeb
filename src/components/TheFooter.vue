<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-grid">
        <!-- Columna Marca -->
        <div class="footer-brand-col">
          <router-link to="/" class="footer-brand-link" aria-label="María Diezma Inicio">
            <img 
              src="/assets/images/logo-maria-diezma.png" 
              alt="María Diezma Atelier de Novias" 
              class="footer-logo-img"
            >
          </router-link>
          <p class="footer-brand-desc">
            Creaciones exclusivas a medida elaboradas artesanalmente con tejidos nobles, devoción por los acabados y respeto por la silueta femenina.
          </p>
        </div>

        <!-- Columna Enlaces -->
        <div class="footer-links-col">
          <h4 class="footer-col-title">Atelier</h4>
          <ul class="footer-links-list">
            <li><router-link to="/conoceme">Conóceme</router-link></li>
            <li><router-link to="/colecciones">Colecciones</router-link></li>
            <li><router-link to="/proceso">Nuestro Proceso</router-link></li>
            <li><router-link to="/prensa">Prensa</router-link></li>
            <li><router-link to="/cita">Pedir Cita Previa</router-link></li>
          </ul>
        </div>

        <!-- Columna Atelier & Horarios -->
        <div class="footer-contact-col">
          <h4 class="footer-col-title">Visítanos</h4>
          <p class="footer-info-item">
            <strong>Atelier Madrid</strong><br>
            Calle Velázquez, Salamanca<br>
            28001 Madrid, España
          </p>
          <p class="footer-info-item">
            <strong>Horario (Solo Cita Previa)</strong><br>
            Lunes – Viernes: 10:00 – 19:30<br>
            Sábados: 10:00 – 14:00
          </p>
        </div>

        <!-- Columna Contacto Directo -->
        <div class="footer-contact-col">
          <h4 class="footer-col-title">Contacto</h4>
          <p class="footer-info-item">
            <strong>Atención Personalizada</strong><br>
            <a href="tel:+34629675583" class="footer-contact-link">+34 629 675 583</a><br>
            <a href="mailto:mariadiezmanovias@yahoo.es" class="footer-contact-link">mariadiezmanovias@yahoo.es</a>
          </p>
          <div class="footer-socials">
            <a 
              href="https://www.instagram.com/mariadiezma_atelier/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="footer-instagram-link"
              aria-label="Instagram de María Diezma Atelier (@mariadiezma_atelier)"
            >
              <svg class="instagram-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@mariadiezma_atelier</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} María Diezma Atelier. Todos los derechos reservados. Alta Costura Nupcial.</p>
        <div class="footer-legal-links">
          <span>Aviso Legal</span>
          <span>·</span>
          <span>Política de Privacidad</span>
          <span>·</span>
          <span>Cookies</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #1f1b1a;
  color: #d1c8c2;
  padding: 4.5rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.2fr;
  gap: 3rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand-link {
  display: inline-block;
  margin-bottom: 1.25rem;
}

.footer-logo-img {
  height: 46px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
  transition: opacity 0.25s ease;
}

.footer-brand-link:hover .footer-logo-img {
  opacity: 0.85;
}

.footer-brand-desc {
  font-size: 0.88rem;
  line-height: 1.7;
  color: #a89f99;
  max-width: 320px;
}

.footer-col-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 1.25rem;
  letter-spacing: 0.05em;
}

.footer-links-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links-list a {
  font-size: 0.88rem;
  color: #a89f99;
  transition: var(--transition-base);
}

.footer-links-list a:hover {
  color: #ffffff;
  padding-left: 4px;
}

.footer-info-item {
  font-size: 0.86rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #a89f99;
}

.footer-info-item strong {
  color: #e5ded8;
  font-weight: 500;
}

.footer-contact-link {
  color: #d1c8c2;
  display: inline-block;
  margin-top: 0.15rem;
}

.footer-contact-link:hover {
  color: #ffffff;
}

.footer-socials {
  margin-top: 1.25rem;
}

.footer-instagram-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #a89f99;
  font-size: 0.85rem;
  transition: color 0.25s ease, transform 0.25s ease;
  text-decoration: none;
}

.footer-instagram-link:hover {
  color: #ffffff;
  transform: translateX(2px);
}

.instagram-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  flex-shrink: 0;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  font-size: 0.8rem;
  color: #7d7570;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-legal-links {
  display: flex;
  gap: 0.6rem;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

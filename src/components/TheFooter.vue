<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-grid">
        <!-- Columna Marca -->
        <div class="footer-brand-col">
          <span class="footer-brand-title">MARÍA DIEZMA</span>
          <span class="footer-brand-sub">ATELIER NUPCIAL · MADRID</span>
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
            <a href="tel:+34910000000" class="footer-contact-link">+34 910 00 00 00</a><br>
            <a href="mailto:hola@mariadiezma.com" class="footer-contact-link">hola@mariadiezma.com</a>
          </p>
          <div class="footer-socials">
            <span class="social-tag">Instagram: @mariadiezma_atelier</span>
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

.footer-brand-title {
  font-family: var(--font-brand);
  font-size: 1.35rem;
  letter-spacing: 0.18em;
  color: #ffffff;
  display: block;
}

.footer-brand-sub {
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  color: #9e4b37;
  display: block;
  margin-top: 0.25rem;
  margin-bottom: 1.25rem;
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

.social-tag {
  font-size: 0.82rem;
  color: #a89f99;
  font-style: italic;
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

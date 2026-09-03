<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BACKOFFICE_URI } from '../config/env'

const router = useRouter()

// Colecciones recuperadas desde el Backoffice
const collections = ref([])

/**
 * ==========================================================================
 * PETICIÓN GET AL BACKOFFICE PARA RECUPERAR LAS COLECCIONES (PROTOTIPO)
 * ==========================================================================
 * Consulta el listado de colecciones disponibles y limita en código la
 * publicación a un máximo de 2 elementos.
 */
async function fetchBackofficeCollections() {
  const url = `${BACKOFFICE_URI}/v1/colecciones`
  console.info(`[HomeView] Consultando colecciones desde: ${url}`)

  try {
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } })
    if (response.ok) {
      const result = await response.json()
      if (result && result.success && Array.isArray(result.data)) {
        return result.data.slice(0, 2).map(c => ({
          id: c.id,
          name: c.nombre,
          imageUrl: c.imagen.startsWith('/') ? c.imagen : '/' + c.imagen,
          link: '/colecciones'
        }))
      }
    }
  } catch (err) {
    console.warn('[HomeView] No se pudo conectar a la API, usando datos de respaldo:', err.message)
  }

  // Datos de respaldo con las colecciones reales devueltas por la API
  const realCollections = [
    {
      id: "20000000-0000-0000-0000-000000000001",
      name: "Romance",
      imageUrl: "/assets/images/romance/MARIA_DIEZMA_001.jpg",
      link: "/colecciones"
    },
    {
      id: "20000000-0000-0000-0000-000000000002",
      name: "Nayade de Gala",
      imageUrl: "/assets/images/nayade/MARIA_DIEZMA_016.jpg",
      link: "/colecciones"
    }
  ]

  return realCollections.slice(0, 2)
}

onMounted(async () => {
  collections.value = await fetchBackofficeCollections()
})

function goToBooking() {
  router.push('/cita')
}
</script>

<template>
  <div class="home-view">
    <!-- ==========================================================================
         1. HERO EDITORIAL A PANTALLA COMPLETA
         ========================================================================== -->
    <section class="hero-fullwidth" data-od-id="hero-section">
      <img 
        src="/assets/images/romance/MARIA_DIEZMA_076.jpg" 
        alt="Vestido de novia de alta costura confeccionado a mano en el atelier - Colección Náyade"
        class="hero-bg-img"
      >
      <div class="hero-scrim"></div>

      <div class="hero-center-box">
        <span class="hero-kicker">Alta Costura Nupcial · Madrid</span>
        <h1 class="hero-title">El vestido de novia que nace de tu propia historia</h1>
        <p class="hero-subtitle">
          Diseños exclusivos elaborados artesanalmente en nuestro atelier de Madrid con tejidos nobles y patronaje a medida.
        </p>

        <router-link to="/cita" class="btn-hero-cita" data-od-id="cta-hero-pedir-cita">
          <span>Pedir Cita</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </router-link>
      </div>
    </section>

    <!-- ==========================================================================
         2. SECCIÓN CONÓCEME (HISTORIA & FILOSOFÍA)
         ========================================================================== -->
    <section id="conoceme" class="section-designer" data-od-id="section-designer-conoceme">
      <div class="container">
        <div class="designer-split-grid">
          <div class="designer-media-col">
            <div class="designer-img-frame">
              <img 
                src="/assets/images/romance/MARIA_DIEZMA_077.jpg" 
                alt="María Diezma diseñadora en su mesa de corte y confección en el atelier"
                class="designer-img"
              >
              <div class="designer-badge-tag">
                <span class="title">María Diezma</span>
                <span class="subtitle">Directora Creativa & Maestra Costurera</span>
              </div>
            </div>
          </div>

          <div class="designer-content-col">
            <span class="eyebrow-label">Conóceme · El Alma del Atelier</span>
            <h2 class="section-heading">Artesanía, tiempo y devoción por cada puntada</h2>
            
            <p class="designer-desc-text">
              Tras más de una década dedicada al patronaje de alta costura y el bordado tradicional, fundé este atelier con un propósito honesto: alejar a la novia de la producción masiva para devolverle el valor a la costura pausada, íntima y rigurosamente personalizada.
            </p>

            <p class="designer-desc-text">
              Aquí no existen dos vestidos iguales porque no hay dos mujeres idénticas. Escucho tus ideas, estudio tus proporciones y dibujamos juntas un boceto inicial en gasa y lino hasta hallar esa armonía perfecta que te hace sentir tú misma, bella e inolvidable en tu día.
            </p>

            <blockquote class="designer-quote">
              «Un vestido a medida no solo viste un cuerpo: abriga la emoción de uno de los días más significativos de tu vida.»
            </blockquote>

            <router-link to="/conoceme" class="link-editorial-arrow" data-od-id="link-historia-completa">
              <span>Conocer la historia completa de María Diezma</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         3. SECCIÓN COLECCIONES DESTACADAS
         ========================================================================== -->
    <section class="section-collections">
      <div class="container">
        <div class="collections-header">
          <span class="eyebrow-label">Colecciones del Atelier</span>
          <h2 class="section-heading">Líneas de inspiración para tu vestido</h2>
          <p class="section-subtext">
            Puntos de partida creativos concebidos para despertar tu imaginación. Cada diseño se adapta, transforma y perfecciona según tu silueta y esencia.
          </p>
        </div>

        <div class="collections-grid-two">
          <article 
            v-for="collection in collections" 
            :key="collection.id" 
            class="collection-card"
          >
            <!-- 1. IMAGEN -->
            <div class="collection-figure">
              <span class="collection-badge-year">Colección</span>
              <img 
                :src="collection.imageUrl" 
                :alt="collection.name"
                class="collection-img"
                loading="lazy"
              >
            </div>
            <!-- 2. NOMBRE DE LA COLECCIÓN -->
            <div class="collection-caption">
              <div class="collection-meta">
                <h3 class="collection-name">{{ collection.name }}</h3>
              </div>
              <router-link :to="collection.link || '/colecciones'" class="collection-action-link">
                <span>Ver colección</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         4. NUESTRO PROCESO PREVIEW
         ========================================================================== -->
    <section class="section-process-preview">
      <div class="container">
        <div class="process-preview-header">
          <span class="eyebrow-label">Alta Costura a Medida</span>
          <h2 class="section-heading">Nuestro proceso: El Arte de Crear Tu Vestido de Novia Perfecto</h2>
          <p class="section-subtext">
            En nuestro atelier, cada vestido de novia es una obra maestra única, creada con amor y atención meticulosa a cada detalle. Nuestro proceso de creación se caracteriza por la colaboración cercana con la novia, garantizando que su vestido no solo refleje su estilo personal, sino que también haga realidad sus sueños más preciados.
          </p>
        </div>

        <div class="process-steps-row">
          <div class="process-step-item">
            <div class="step-badge-row">
              <span class="step-num">01</span>
              <span class="step-phase-tag">Capturando tu Visión</span>
            </div>
            <h4>1. Consulta Inicial</h4>
            <p>El viaje comienza con una consulta personalizada en nuestro acogedor estudio para conocerte, comprender tus gustos y explorar estilos y telas para transformarlos en un diseño único.</p>
          </div>

          <div class="process-step-item">
            <div class="step-badge-row">
              <span class="step-num">02</span>
              <span class="step-phase-tag">Dando Forma a tus Sueños</span>
            </div>
            <h4>2. Bocetos y Diseño</h4>
            <p>Con técnicas tradicionales, creamos bocetos detallados teniendo en cuenta tu figura y estilo, ajustando y perfeccionando contigo hasta encontrar el diseño perfecto.</p>
          </div>

          <div class="process-step-item">
            <div class="step-badge-row">
              <span class="step-num">03</span>
              <span class="step-phase-tag">La Elegancia en Cada Puntada</span>
            </div>
            <h4>3. Selección de Telas y Detalles</h4>
            <p>Trabajamos con encajes delicados, sedas lujosas y tules etéreos. Te invitamos a tocar las telas y seleccionar bordados, pedrería y apliques que darán ese toque especial.</p>
          </div>

          <div class="process-step-item">
            <div class="step-badge-row">
              <span class="step-num">04</span>
              <span class="step-phase-tag">Perfeccionando Cada Detalle</span>
            </div>
            <h4>4. Creación y Pruebas</h4>
            <p>Damos vida a tu vestido a lo largo de varias pruebas, ajustando y refinando cada detalle para asegurar un ajuste perfecto y que te sientas cómoda y segura el día de tu boda.</p>
          </div>

          <div class="process-step-item">
            <div class="step-badge-row">
              <span class="step-num">05</span>
              <span class="step-phase-tag">Preparada para tu Gran Día</span>
            </div>
            <h4>5. Toques Finales y Entrega</h4>
            <p>Cuidamos los toques finales: planchado artesanal, embellecimiento y preparación minuciosa. Te entregamos tu vestido envuelto en amor y listo para su gran debut.</p>
          </div>

          <div class="process-step-item">
            <div class="step-badge-row">
              <span class="step-num">06</span>
              <span class="step-phase-tag">Brilla con Luz Propia</span>
            </div>
            <h4>6. Día de la Boda</h4>
            <p>Ver nuestro trabajo cobrar vida cuando caminas hacia el altar es nuestro mayor honor. Cada sonrisa y momento de felicidad en tu vestido de novia es el mayor premio para nosotros.</p>
          </div>
        </div>

        <div class="process-quote-banner">
          <p>«Crear tu vestido de novia es un viaje de amor, creatividad y precisión. Estamos aquí para hacer realidad tu visión y asegurarnos de que te sientas absolutamente radiante en tu día especial.»</p>
        </div>

        <div class="process-action-center">
          <router-link to="/proceso" class="btn-outline-dark">
            Descubrir el proceso al detalle
          </router-link>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         5. MAPA & ATELIER EN MADRID
         ========================================================================== -->
    <section class="section-location-map">
      <div class="container">
        <div class="location-card-container">
          <div class="location-grid">
            <div class="map-frame-wrapper">
              <iframe 
                class="map-iframe"
                src="https://maps.google.com/maps?q=Calle+de+Goya+69,+28001+Madrid,+Spain&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="Ubicación del atelier María Diezma en Calle de Goya 69, Madrid"
                loading="lazy"
                allowfullscreen
              ></iframe>
            </div>

            <div class="atelier-info-panel">
              <span class="eyebrow-label">Visítanos en Madrid</span>
              <h3 class="section-heading" style="font-size: 2rem; margin-bottom: 0.75rem;">Nuestro Atelier</h3>
              <p class="designer-desc-text" style="margin-bottom: 1rem;">
                Un espacio privado, tranquilo y luminoso en pleno Barrio de Salamanca diseñado para atenderte sin prisas.
              </p>

              <div class="atelier-details-list">
                <div class="atelier-item">
                  <div class="icon">📍</div>
                  <div>
                    <strong>Dirección</strong>
                    <p>Calle de Goya, 69 · 28001 Madrid (Barrio Salamanca)</p>
                  </div>
                </div>
                <div class="atelier-item">
                  <div class="icon">🕒</div>
                  <div>
                    <strong>Horario con Cita Previa</strong>
                    <p>Lunes a Viernes: 10:00 – 19:30 · Sábados: 10:00 – 14:00</p>
                  </div>
                </div>
                <div class="atelier-item">
                  <div class="icon">✉️</div>
                  <div>
                    <strong>Contacto</strong>
                    <p>mariadiezmanovias@yahoo.es · +34 629 675 583</p>
                  </div>
                </div>
              </div>

              <router-link to="/cita" class="btn-hero-cita" style="margin-top: 1.5rem; display: inline-flex;">
                <span>Reservar Cita en el Atelier</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* HERO */
.hero-fullwidth {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  overflow: hidden;
  padding: 4rem 1.5rem;
}

.hero-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-scrim {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(20, 15, 13, 0.45) 0%, rgba(20, 15, 13, 0.65) 100%);
  z-index: 2;
}

.hero-center-box {
  position: relative;
  z-index: 3;
  max-width: 780px;
  margin: 0 auto;
}

.hero-kicker {
  display: inline-block;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #eedcd3;
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.8vw, 3.8rem);
  line-height: 1.15;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.hero-subtitle {
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  font-weight: 300;
  line-height: 1.7;
  color: #e5ded8;
  max-width: 620px;
  margin: 0 auto 2.5rem;
}

.btn-hero-cita {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--accent);
  color: #ffffff;
  padding: 0.95rem 2.2rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 500;
  border-radius: 2px;
  transition: var(--transition-base);
  box-shadow: 0 8px 24px rgba(158, 75, 55, 0.35);
}

.btn-hero-cita:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(158, 75, 55, 0.45);
}

/* SECTION DESIGNER */
.section-designer {
  padding: 6.5rem 0;
  background-color: var(--bg);
}

.designer-split-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 4.5rem;
  align-items: center;
}

.designer-img-frame {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(44, 37, 35, 0.12);
}

.designer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.designer-badge-tag {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  padding: 0.8rem 1.4rem;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
}

.designer-badge-tag .title {
  font-family: var(--font-brand);
  font-size: 0.95rem;
  letter-spacing: 0.12em;
  color: var(--fg);
  font-weight: 600;
}

.designer-badge-tag .subtitle {
  font-size: 0.72rem;
  color: var(--muted);
  letter-spacing: 0.05em;
  margin-top: 2px;
}

.eyebrow-label {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.section-heading {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.2vw, 2.7rem);
  line-height: 1.25;
  color: var(--fg);
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.designer-desc-text {
  font-size: 0.98rem;
  line-height: 1.8;
  color: var(--muted);
  margin-bottom: 1.25rem;
}

.designer-quote {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--fg);
  border-left: 2px solid var(--accent);
  padding-left: 1.5rem;
  margin: 2rem 0;
}

.link-editorial-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 600;
  transition: gap 0.2s ease;
}

.link-editorial-arrow:hover {
  gap: 0.85rem;
}

/* SECTION COLLECTIONS */
.section-collections {
  padding: 6rem 0;
  background-color: #ffffff;
}

.collections-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 3.5rem;
}

.section-subtext {
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--muted);
}

.collections-grid-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-bottom: 0;
}

.collection-card {
  background: var(--bg);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.collection-figure {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.collection-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.collection-card:hover .collection-img {
  transform: scale(1.03);
}

.collection-badge-year {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.8rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--fg);
  border-radius: 2px;
}

.collection-caption {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.collection-name {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 400;
  margin-bottom: 0.65rem;
}

.collection-summary {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.collection-action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 600;
}

.collection-action-link:hover {
  gap: 0.8rem;
}

/* FEATURED DRESSES GRID */
.featured-dresses-section {
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.featured-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.featured-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
}

.dresses-grid-four {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* PROCESS PREVIEW */
.section-process-preview {
  padding: 6.5rem 0;
  background-color: var(--bg);
}

.process-preview-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 4rem;
}

.process-steps-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.process-step-item {
  background: #ffffff;
  padding: 2.2rem 1.8rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.process-step-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.04);
}

.step-badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.step-num {
  font-family: var(--font-brand);
  font-size: 1.75rem;
  color: var(--accent);
  font-weight: 500;
  line-height: 1;
}

.step-phase-tag {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  background: var(--bg);
  padding: 0.25rem 0.6rem;
  border-radius: 2px;
  border: 1px solid var(--border);
}

.process-step-item h4 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: var(--fg);
  line-height: 1.35;
}

.process-step-item p {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.65;
}

.process-quote-banner {
  max-width: 820px;
  margin: 0 auto 3rem;
  text-align: center;
  padding: 1.5rem 2rem;
  border-left: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
  background: #ffffff;
  border-radius: 2px;
}

.process-quote-banner p {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-style: italic;
  color: var(--fg);
  line-height: 1.65;
}

.process-action-center {
  text-align: center;
}

.btn-outline-dark {
  display: inline-block;
  border: 1px solid var(--fg);
  padding: 0.85rem 2rem;
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--fg);
  transition: var(--transition-base);
}

.btn-outline-dark:hover {
  background: var(--fg);
  color: #ffffff;
}

/* LOCATION SECTION */
.section-location-map {
  padding: 6rem 0;
  background-color: #ffffff;
}

.location-card-container {
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  background: var(--bg);
}

.location-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}

.map-frame-wrapper {
  min-height: 420px;
  height: 100%;
}

.map-iframe {
  width: 100%;
  height: 100%;
  min-height: 420px;
  border: 0;
}

.atelier-info-panel {
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.atelier-details-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 1.5rem 0;
}

.atelier-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.atelier-item .icon {
  font-size: 1.2rem;
  line-height: 1;
}

.atelier-item strong {
  display: block;
  font-size: 0.88rem;
  color: var(--fg);
  margin-bottom: 0.2rem;
}

.atelier-item p {
  font-size: 0.84rem;
  color: var(--muted);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .dresses-grid-four {
    grid-template-columns: repeat(2, 1fr);
  }
  .process-steps-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 868px) {
  .designer-split-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .collections-grid-two {
    grid-template-columns: 1fr;
  }
  .location-grid {
    grid-template-columns: 1fr;
  }
  .atelier-info-panel {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 600px) {
  .dresses-grid-four {
    grid-template-columns: 1fr;
  }
  .process-steps-row {
    grid-template-columns: 1fr;
  }
}
</style>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DRESSES_DATA } from '../data/dresses'
import { BACKOFFICE_URI } from '../config/env'

const route = useRoute()
const router = useRouter()

const backofficeDress = ref(null)

/**
 * ==========================================================================
 * PETICIÓN GET AL BACKOFFICE PARA RECUPERAR DETALLES DEL VESTIDO
 * Endpoint: http://localhost:8080/api/v1/vestidos/detalle?nombre=...&coleccion=...
 * ==========================================================================
 */
async function fetchBackofficeDressDetail(nombre, coleccion) {
  const queryParams = new URLSearchParams()
  if (nombre) queryParams.append('nombre', nombre)
  if (coleccion) queryParams.append('coleccion', coleccion)

  const url = `${BACKOFFICE_URI}/v1/vestidos/detalle?${queryParams.toString()}`
  console.info(`[DetalleView] Consultando detalle de vestido: ${url}`)

  try {
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } })
    if (response.ok) {
      const result = await response.json()
      if (result && result.success && result.data) {
        const d = result.data
        return {
          id: d.id,
          name: d.nombre,
          collection: d.coleccion,
          collectionName: `Colección ${d.coleccion}`,
          description: d.descripcion,
          ref: d.id,
          fabric: 'Seda natural & bordados botánicos',
          back: 'Contra parte con espalda artesanal a medida',
          silhouette: 'Patronaje estructural adaptado a la silueta',
          time: '4 a 6 meses de confección en atelier',
          images: (() => {
            const raw1 = d.ruta_imagen_1 || '';
            const raw2 = d.ruta_imagen_2 || '';
            const raw3 = d.ruta_imagen_3 || '';

            let rawTrasera = raw3 || raw2 || raw1;
            let rawZoom = raw2 || raw3 || raw1;

            if (raw2.includes('003') || raw2.toLowerCase().includes('trasera') || raw2.toLowerCase().includes('back') || raw2.toLowerCase().includes('espalda')) {
              rawTrasera = raw2;
              rawZoom = raw3 || raw2;
            } else if (raw3.includes('003') || raw3.toLowerCase().includes('trasera') || raw3.toLowerCase().includes('back') || raw3.toLowerCase().includes('espalda') ||
                       raw2.includes('002') || raw2.toLowerCase().includes('zoom') || raw2.toLowerCase().includes('detalle')) {
              rawTrasera = raw3;
              rawZoom = raw2;
            }

            const clean = (p) => p ? (p.startsWith('/') ? p : '/' + p) : '';

            return {
              front: clean(raw1),
              back: clean(rawTrasera),
              detail: clean(rawZoom),
              movement: clean(rawZoom)
            };
          })()
        }
      }
    }
  } catch (err) {
    console.error('[DetalleView] Error al consultar la API de detalle:', err.message)
  }

  return null
}

async function loadDressData() {
  const nombre = route.query.nombre || ''
  const coleccion = route.query.coleccion || ''

  backofficeDress.value = await fetchBackofficeDressDetail(nombre, coleccion)
}

onMounted(() => {
  loadDressData()
})

const dress = computed(() => backofficeDress.value)

// Miniaturas y selector de imagen
const activeImageKey = ref('front')
const activeCaption = ref('Vista Delantera · Silueta Principal')
const isTransitioning = ref(false)

const activeImageSrc = computed(() => {
  if (!dress.value || !dress.value.images) return ''
  return dress.value.images[activeImageKey.value] || dress.value.images.front
})

function selectImage(key, caption) {
  if (activeImageKey.value === key) return
  isTransitioning.value = true
  setTimeout(() => {
    activeImageKey.value = key
    activeCaption.value = caption
    isTransitioning.value = false
  }, 160)
}

watch(() => [route.query.nombre, route.query.coleccion], () => {
  loadDressData()
  activeImageKey.value = 'front'
  activeCaption.value = 'Vista Delantera · Silueta Principal'
})
</script>

<template>
  <div v-if="dress" class="detalle-view">
    <!-- BARRA SUPERIOR CON MIGA DE PAN Y NAVEGACIÓN -->
    <div class="showcase-nav-bar">
      <div class="container showcase-nav-inner">
        <nav class="breadcrumb" aria-label="Miga de pan">
          <router-link to="/">Atelier</router-link>
          <span>/</span>
          <router-link to="/colecciones">Colecciones</router-link>
          <span>/</span>
          <span class="current">{{ dress.name }}</span>
        </nav>

      </div>
    </div>

    <!-- CONTENEDOR PRINCIPAL DEL SHOWCASE -->
    <section class="showcase-main-section">
      <div class="container">
        <div class="showcase-grid">
          
          <!-- COLUMNA VISUAL CON VISOR GRANDE Y MINIATURAS -->
          <div class="showcase-media-col">
            <div class="main-image-viewport">
              <img 
                :src="activeImageSrc" 
                :alt="dress.name" 
                class="large-dress-image"
                :class="{ 'is-fading': isTransitioning }"
              >
            </div>

            <!-- BOTONES DE MINIATURA (3 IMÁGENES: DELANTERA, TRASERA Y ZOOM) -->
            <div class="thumbnails-bar">
              <button 
                class="thumb-btn" 
                :class="{ 'active': activeImageKey === 'front' }"
                @click="selectImage('front', 'Vista Delantera · Silueta Principal')"
              >
                <img :src="dress.images.front" alt="Vista Delantera">
                <span class="thumb-label">DELANTERA</span>
              </button>

              <button 
                class="thumb-btn is-contraparte" 
                :class="{ 'active': activeImageKey === 'back' }"
                @click="selectImage('back', 'Contra Parte · Espalda & Vista Trasera')"
              >
                <img :src="dress.images.back" alt="Vista Trasera">
                <span class="thumb-label">TRASERA</span>
              </button>

              <button 
                class="thumb-btn" 
                :class="{ 'active': activeImageKey === 'detail' }"
                @click="selectImage('detail', 'Vista Detalle & Zoom de Costura')"
              >
                <img :src="dress.images.detail" alt="Vista Zoom">
                <span class="thumb-label">ZOOM</span>
              </button>
            </div>
          </div>

          <!-- COLUMNA INFORMATIVA Y FICHA TÉCNICA -->
          <div class="showcase-info-col">
            <div class="info-header">
              <div class="collection-ref-row">
                <span class="collection-tag">{{ dress.collectionName }}</span>
              </div>
              <h1 class="dress-title">{{ dress.name }}</h1>
              <p class="dress-desc">{{ dress.description }}</p>
            </div>



            <div class="booking-cta-block">
              <router-link 
                :to="`/cita?vestido=${dress.id}`" 
                class="btn-book-dress"
              >
                <span>Pedir Cita para este Vestido</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </router-link>
              <p class="booking-hint">
                El diseño se adaptará en exclusiva a tus medidas y preferencias en nuestro atelier.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
  <div v-else class="container" style="text-align: center; padding: 6rem 0; color: #a89f99; font-family: var(--font-mono); font-size: 0.95rem;">
    No se ha encontrado la ficha del vestido solicitado.
  </div>
</template>

<style scoped>
.showcase-nav-bar {
  background: #ffffff;
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
}

.showcase-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.breadcrumb a:hover {
  color: var(--accent);
}

.breadcrumb .current {
  color: var(--fg);
  font-weight: 600;
}

.dress-stepper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--fg);
  padding: 0.4rem 0.6rem;
  border-radius: 2px;
  transition: var(--transition-base);
}

.step-btn:hover {
  color: var(--accent);
}

.step-counter {
  font-size: 0.82rem;
  color: var(--muted);
  font-family: var(--font-mono);
}

.showcase-main-section {
  padding: 4rem 0 6rem;
  background-color: var(--bg);
}

.showcase-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 4.5rem;
  align-items: flex-start;
}

/* VISUAL MEDIA */
.showcase-media-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.main-image-viewport {
  position: relative;
  aspect-ratio: 3 / 4;
  background: #f0ebe5;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(44, 37, 35, 0.08);
}

.large-dress-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.18s ease;
}

.large-dress-image.is-fading {
  opacity: 0.3;
}

.view-indicator-pill {
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  padding: 0.45rem 1rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--fg);
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.thumbnails-bar {
  display: flex;
  gap: 0.85rem;
  justify-content: flex-start;
}

.thumb-btn {
  position: relative;
  width: 82px;
  height: 106px;
  border-radius: 3px;
  overflow: hidden;
  border: 2px solid transparent;
  background: #eae4de;
  transition: var(--transition-base);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-label {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(44, 37, 35, 0.78);
  color: #ffffff;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0;
  text-align: center;
}

.thumb-btn.is-contraparte {
  border-color: #d1b8ab;
}

.thumb-btn.active {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(158, 75, 55, 0.25);
}

.thumb-btn.active .thumb-label {
  background: var(--accent);
}

/* INFO COL */
.showcase-info-col {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.collection-ref-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.collection-tag {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--accent);
  font-weight: 600;
}

.dress-ref-tag {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--muted);
  background: #eee8e2;
  padding: 0.2rem 0.6rem;
  border-radius: 2px;
}

.dress-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.2vw, 2.8rem);
  font-weight: 400;
  color: var(--fg);
  margin-bottom: 1rem;
}

.dress-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted);
}

.specs-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03);
}

.specs-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.specs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.spec-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.spec-row dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  font-weight: 600;
}

.spec-row dd {
  font-size: 0.94rem;
  color: var(--fg);
}

.spec-row.highlight-row {
  background: #fcf8f5;
  border-left: 2px solid var(--accent);
  padding: 0.5rem 0.85rem;
  border-radius: 2px;
}

.spec-row.highlight-row dt {
  color: var(--accent);
}

.booking-cta-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-book-dress {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--accent);
  color: #ffffff;
  padding: 1.1rem 2rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 500;
  border-radius: 2px;
  transition: var(--transition-base);
}

.btn-book-dress:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(158, 75, 55, 0.3);
}

.booking-hint {
  font-size: 0.82rem;
  color: var(--muted);
  text-align: center;
}

@media (max-width: 900px) {
  .showcase-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>

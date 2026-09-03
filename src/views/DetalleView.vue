<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DRESSES_DATA } from '../data/dresses'

const route = useRoute()
const router = useRouter()

const currentIndex = computed(() => {
  const paramId = route.params.id
  const idx = DRESSES_DATA.findIndex(d => d.id.toLowerCase() === String(paramId).toLowerCase())
  return idx !== -1 ? idx : 0
})

const dress = computed(() => DRESSES_DATA[currentIndex.value])

// Miniaturas y selector de imagen
const activeImageKey = ref('front')
const activeCaption = ref('Vista Delantera · Silueta Principal')
const isTransitioning = ref(false)

const activeImageSrc = computed(() => {
  if (!dress.value) return ''
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

function prevDress() {
  const newIndex = (currentIndex.value - 1 + DRESSES_DATA.length) % DRESSES_DATA.length
  router.push(`/vestido/${DRESSES_DATA[newIndex].id}`)
}

function nextDress() {
  const newIndex = (currentIndex.value + 1) % DRESSES_DATA.length
  router.push(`/vestido/${DRESSES_DATA[newIndex].id}`)
}

watch(() => route.params.id, () => {
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

        <div class="dress-stepper">
          <button class="step-btn" @click="prevDress" title="Vestido anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Anterior</span>
          </button>
          <span class="step-counter">{{ currentIndex + 1 }} de {{ DRESSES_DATA.length }}</span>
          <button class="step-btn" @click="nextDress" title="Vestido siguiente">
            <span>Siguiente</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
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
                :alt="`${dress.name} - ${activeCaption}`" 
                class="large-dress-image"
                :class="{ 'is-fading': isTransitioning }"
              >
              <div class="view-indicator-pill">
                {{ activeCaption }}
              </div>
            </div>

            <!-- BOTONES DE MINIATURA (INCLUYENDO LA CONTRA PARTE) -->
            <div class="thumbnails-bar">
              <button 
                class="thumb-btn" 
                :class="{ 'active': activeImageKey === 'front' }"
                @click="selectImage('front', 'Vista Delantera · Silueta Principal')"
              >
                <img :src="dress.images.front" alt="Vista Delantera">
                <span class="thumb-label">Delantera</span>
              </button>

              <button 
                class="thumb-btn is-contraparte" 
                :class="{ 'active': activeImageKey === 'back' }"
                @click="selectImage('back', 'Contra Parte · Espalda & Escote Trasero')"
              >
                <img :src="dress.images.back" alt="Contra Parte">
                <span class="thumb-label">Contra Parte</span>
              </button>

              <button 
                class="thumb-btn" 
                :class="{ 'active': activeImageKey === 'detail' }"
                @click="selectImage('detail', 'Detalle de Tejido & Acabados')"
              >
                <img :src="dress.images.detail" alt="Detalle de Tejido">
                <span class="thumb-label">Tejido</span>
              </button>

              <button 
                class="thumb-btn" 
                :class="{ 'active': activeImageKey === 'movement' }"
                @click="selectImage('movement', 'Silueta en Movimiento & Caída')"
              >
                <img :src="dress.images.movement" alt="Movimiento y Caída">
                <span class="thumb-label">Caída</span>
              </button>
            </div>
          </div>

          <!-- COLUMNA INFORMATIVA Y FICHA TÉCNICA -->
          <div class="showcase-info-col">
            <div class="info-header">
              <div class="collection-ref-row">
                <span class="collection-tag">{{ dress.collectionName }}</span>
                <span class="dress-ref-tag">REF. {{ dress.ref }}</span>
              </div>
              <h1 class="dress-title">{{ dress.name }}</h1>
              <p class="dress-desc">{{ dress.description }}</p>
            </div>

            <div class="specs-card">
              <h3 class="specs-title">Ficha Técnica de Costura</h3>
              <dl class="specs-list">
                <div class="spec-row">
                  <dt>Tejido Principal</dt>
                  <dd>{{ dress.fabric }}</dd>
                </div>
                <div class="spec-row highlight-row">
                  <dt>Contra Parte (Espalda)</dt>
                  <dd>{{ dress.back }}</dd>
                </div>
                <div class="spec-row">
                  <dt>Silueta & Patrón</dt>
                  <dd>{{ dress.silhouette }}</dd>
                </div>
                <div class="spec-row">
                  <dt>Tiempo de Confección</dt>
                  <dd>{{ dress.time }}</dd>
                </div>
              </dl>
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.thumb-btn {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 3px;
  overflow: hidden;
  border: 2px solid transparent;
  background: #eae4de;
  transition: var(--transition-base);
  display: flex;
  flex-direction: column;
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

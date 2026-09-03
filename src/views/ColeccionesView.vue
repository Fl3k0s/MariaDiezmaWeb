<script setup>
import { ref, computed, onMounted } from 'vue'
import { DRESSES_DATA } from '../data/dresses'
import DressCard from '../components/DressCard.vue'

const activeFilter = ref('all')
const backofficeCollection = ref(null)
const dresses = ref([])

/**
 * ==========================================================================
 * BLOQUE DE RECUPERACIÓN DE BACKOFFICE (PROTOTIPO)
 * ==========================================================================
 * Simula la obtención de datos de una colección desde el backoffice del atelier
 * sin llamada web HTTP real por tratarse de un prototipo.
 */
function fetchBackofficeCollection() {
  return {
    id: "capsula-seda-niebla",
    name: "Colección Cápsula: Seda & Bruma",
    collectionNumber: "03 / Backoffice",
    seasonTag: "Edición Limitada 2026",
    badge: "Sincronizado desde Backoffice",
    description: "Propuesta exclusiva gestionada directamente desde el backoffice del atelier. Caracterizada por la sutileza de gasas de seda translúcidas superpuestas y una contra parte geométrica que enmarca la espalda en líneas puras y etéreas.",
    imageUrl: "https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Colección Cápsula Seda y Bruma - María Diezma Atelier",
    ctaText: "Solicitar cita para esta colección",
    ctaUrl: "/cita?coleccion=seda-bruma"
  }
}

/**
 * ==========================================================================
 * RECUPERACIÓN DE DISEÑOS DESDE BACKOFFICE (PROTOTIPO)
 * ==========================================================================
 * Simula la respuesta del backoffice con los diseños de vestidos.
 * Retorna: id, name, collection, collectionName e imageUrl.
 */
function fetchBackofficeDresses() {
  return DRESSES_DATA.map(d => ({
    id: d.id,
    name: d.name,
    collection: d.collection,
    collectionName: d.collectionName || (d.collection === 'siluetas' ? 'Colección Siluetas Puras' : 'Colección Botánica & Bordados'),
    imageUrl: d.images?.front
  }))
}

onMounted(() => {
  // Recuperar información de la colección destacada desde el backoffice (prototipo)
  backofficeCollection.value = fetchBackofficeCollection()
  // Recuperar los diseños de vestidos desde el backoffice (prototipo)
  dresses.value = fetchBackofficeDresses()
})

const filteredDresses = computed(() => {
  if (activeFilter.value === 'all') return dresses.value
  return dresses.value.filter(d => d.collection === activeFilter.value)
})

function setFilter(category) {
  activeFilter.value = category
}
</script>

<template>
  <div class="colecciones-view">
    <!-- CABECERA DE LA PÁGINA -->
    <section class="page-hero">
      <div class="container">
        <span class="page-eyebrow">Atelier de Costura Nupcial</span>
        <h1 class="page-title">Colecciones de Vestidos a Medida</h1>
        <p class="page-lead">
          Cada vestido es el inicio de una conversación. Explora nuestras líneas maestras de diseño y descubre las múltiples posibilidades de personalización, tejidos y espaldas.
        </p>
      </div>
    </section>

    <!-- BLOQUE DINÁMICO: INFORMACIÓN RECUPERADA DEL BACKOFFICE (PROTOTIPO) -->
    <section v-if="backofficeCollection" class="backoffice-section" data-od-id="section-backoffice-collection">
      <div class="container">
        <article class="backoffice-card">
          
          <!-- LADO 1: IMAGEN DE LA COLECCIÓN -->
          <div class="backoffice-visual">
            <img 
              :src="backofficeCollection.imageUrl" 
              :alt="backofficeCollection.imageAlt"
              class="backoffice-img"
              loading="lazy"
            >
            <div class="backoffice-badge-overlay">
              {{ backofficeCollection.badge }}
            </div>
          </div>

          <!-- LADO 2: NOMBRE, DESCRIPCIÓN Y ESPECIFICACIONES -->
          <div class="backoffice-content">
            <div>
              <div class="backoffice-meta">
                <span class="backoffice-number">{{ backofficeCollection.collectionNumber }}</span>
                <span class="backoffice-season">{{ backofficeCollection.seasonTag }}</span>
              </div>

              <h2 class="backoffice-title">{{ backofficeCollection.name }}</h2>

              <p class="backoffice-desc">
                {{ backofficeCollection.description }}
              </p>
            </div>

            <!-- ACCIONES -->
            <div class="backoffice-actions">
              <router-link :to="backofficeCollection.ctaUrl" class="btn-backoffice-cta">
                {{ backofficeCollection.ctaText }}
              </router-link>
              <span class="backoffice-notice">
                ✦ Registro recuperado del Backoffice (Prototipo)
              </span>
            </div>
          </div>

        </article>
      </div>
    </section>

    <!-- BARRA DE FILTROS & CATÁLOGO -->
    <section class="catalog-section">
      <div class="container">
        <div class="catalog-toolbar">
          <div class="filter-group" role="tablist">
            <button 
              type="button" 
              class="filter-btn" 
              :class="{ 'active': activeFilter === 'all' }"
              @click="setFilter('all')"
            >
              Todos los Diseños ({{ dresses.length }})
            </button>
            <button 
              type="button" 
              class="filter-btn" 
              :class="{ 'active': activeFilter === 'siluetas' }"
              @click="setFilter('siluetas')"
            >
              Siluetas Puras
            </button>
            <button 
              type="button" 
              class="filter-btn" 
              :class="{ 'active': activeFilter === 'botanica' }"
              @click="setFilter('botanica')"
            >
              Botánica & Bordados
            </button>
          </div>

          <div class="catalog-counter">
            Mostrando <strong>{{ filteredDresses.length }}</strong> vestidos
          </div>
        </div>

        <!-- GRID REACTIVO -->
        <transition-group name="dress-grid" tag="div" class="dresses-grid">
          <div v-for="dress in filteredDresses" :key="dress.id" class="grid-item">
            <DressCard :dress="dress" />
          </div>
        </transition-group>

        <!-- BANNER DE CITA PREVIA -->
        <div class="collections-cta-box">
          <div class="cta-box-content">
            <span class="cta-eyebrow">Atención Personalizada</span>
            <h3 class="cta-title">¿Tienes una idea propia o deseas probarte estos diseños?</h3>
            <p class="cta-text">
              Agenda tu cita en nuestro atelier privado de Madrid para probarte nuestras toiles, tocar las sedas y recibir asesoramiento directo de María Diezma.
            </p>
          </div>
          <router-link to="/cita" class="btn-cta-primary">
            Pedir Cita en el Atelier
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 5rem 0 3.5rem;
  background-color: #f6f2ee;
  border-bottom: 1px solid var(--border);
  text-align: center;
}

.page-eyebrow {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 400;
  color: var(--fg);
  margin-bottom: 1.25rem;
}

.page-lead {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--muted);
  max-width: 680px;
  margin: 0 auto;
}

/* ==========================================================================
   ESTILOS DEL BLOQUE BACKOFFICE (LADO IMAGEN / LADO NOMBRE Y DESCRIPCIÓN)
   ========================================================================== */
.backoffice-section {
  padding: 3.5rem 0 1rem;
  background-color: var(--bg);
}

.backoffice-card {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.04);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.backoffice-card:hover {
  border-color: #c9bfb6;
  box-shadow: 0 12px 34px rgba(44, 37, 35, 0.08);
}

/* LADO 1: IMAGEN */
.backoffice-visual {
  position: relative;
  min-height: 520px;
  background-color: #f0ebe5;
  overflow: hidden;
}

.backoffice-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.backoffice-card:hover .backoffice-img {
  transform: scale(1.03);
}

.backoffice-badge-overlay {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  padding: 0.4rem 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  border-radius: 2px;
}

/* LADO 2: NOMBRE, DESCRIPCIÓN Y ESPECIFICACIONES */
.backoffice-content {
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid var(--border);
}

.backoffice-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border);
}

.backoffice-number {
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}

.backoffice-season {
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.backoffice-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 2.8vw, 2.5rem);
  font-weight: 400;
  line-height: 1.25;
  color: var(--fg);
  margin-bottom: 1.25rem;
}

.backoffice-desc {
  font-size: 0.98rem;
  line-height: 1.8;
  color: var(--muted);
  margin-bottom: 2rem;
}

.backoffice-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 2.25rem;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  font-weight: 600;
}

.spec-value {
  font-size: 0.88rem;
  color: var(--fg);
}

.backoffice-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-backoffice-cta {
  display: inline-flex;
  align-items: center;
  background-color: var(--fg);
  color: #ffffff;
  padding: 0.85rem 1.8rem;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 500;
  border-radius: 2px;
  transition: var(--transition-base);
}

.btn-backoffice-cta:hover {
  background-color: var(--accent);
  color: #ffffff;
}

.backoffice-notice {
  font-size: 0.75rem;
  color: var(--muted);
  font-family: monospace;
}

/* ==========================================================================
   CATÁLOGO GENERAL & GRID
   ========================================================================== */
.catalog-section {
  padding: 4rem 0 6rem;
  background-color: var(--bg);
}

.catalog-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 1.5rem;
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.35rem;
  border-radius: 30px;
  font-size: 0.84rem;
  letter-spacing: 0.06em;
  color: var(--muted);
  background: #ffffff;
  border: 1px solid var(--border);
  transition: var(--transition-base);
}

.filter-btn:hover {
  color: var(--fg);
  border-color: #c9bfb6;
}

.filter-btn.active {
  background: var(--fg);
  color: #ffffff;
  border-color: var(--fg);
}

.catalog-counter {
  font-size: 0.88rem;
  color: var(--muted);
}

.catalog-counter strong {
  color: var(--fg);
}

.dresses-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
}

.grid-item {
  transition: all 0.3s ease;
}

/* Transiciones fluidas al filtrar */
.dress-grid-enter-active,
.dress-grid-leave-active {
  transition: all 0.35s ease;
}

.dress-grid-enter-from,
.dress-grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.collections-cta-box {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.cta-eyebrow {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.cta-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
}

.cta-text {
  font-size: 0.94rem;
  color: var(--muted);
  line-height: 1.7;
  max-width: 580px;
}

.btn-cta-primary {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  background-color: var(--accent);
  color: #ffffff;
  padding: 0.95rem 2rem;
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 500;
  border-radius: 2px;
  transition: var(--transition-base);
}

.btn-cta-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

@media (max-width: 1100px) {
  .dresses-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 868px) {
  .backoffice-card {
    grid-template-columns: 1fr;
  }
  .backoffice-content {
    padding: 2.5rem 1.75rem;
    border-left: none;
    border-top: 1px solid var(--border);
  }
  .backoffice-visual {
    min-height: 380px;
  }
  .dresses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .collections-cta-box {
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem 2rem;
  }
}

@media (max-width: 550px) {
  .backoffice-specs {
    grid-template-columns: 1fr;
  }
  .dresses-grid {
    grid-template-columns: 1fr;
  }
}
</style>

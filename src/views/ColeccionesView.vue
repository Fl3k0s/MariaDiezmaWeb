<script setup>
import { ref, computed } from 'vue'
import { DRESSES_DATA } from '../data/dresses'
import DressCard from '../components/DressCard.vue'

const activeFilter = ref('all')

const filteredDresses = computed(() => {
  if (activeFilter.value === 'all') return DRESSES_DATA
  return DRESSES_DATA.filter(d => d.collection === activeFilter.value)
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
              Todos los Diseños ({{ DRESSES_DATA.length }})
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
  .dresses-grid {
    grid-template-columns: 1fr;
  }
}
</style>

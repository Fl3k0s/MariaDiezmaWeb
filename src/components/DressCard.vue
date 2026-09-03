<script setup>
import { computed } from 'vue'

const props = defineProps({
  dress: {
    type: Object,
    required: true
  }
})

const dressImage = computed(() => {
  return props.dress.imageUrl || props.dress.images?.front || ''
})

const dressCollection = computed(() => {
  return props.dress.collectionName || (props.dress.collection === 'siluetas' ? 'Colección Siluetas Puras' : 'Colección Botánica & Bordados')
})
</script>

<template>
  <router-link 
    :to="{ path: `/vestido/${dress.id}`, query: { nombre: dress.name, coleccion: dress.collection } }" 
    class="dress-card-anchor" 
    :title="`Ver detalles de ${dress.name}`"
    :data-dress-id="dress.id"
  >
    <article class="dress-card" :data-id="dress.id">
      <!-- 1. IMAGEN -->
      <div class="dress-card-media">
        <img 
          :src="dressImage" 
          :alt="`${dress.name} - Vista Principal`" 
          class="dress-card-img" 
          loading="lazy"
        >
        <span class="dress-card-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Ver Ficha
        </span>
      </div>

      <!-- 2. COLECCIÓN Y 3. NOMBRE DEL VESTIDO (GUARDANDO EL ID) -->
      <div class="dress-card-body">
        <span class="dress-card-collection">
          {{ dressCollection }}
        </span>
        <h3 class="dress-card-name">{{ dress.name }}</h3>
        
        <div class="dress-card-action">
          <span>Ver detalles</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style scoped>
.dress-card-anchor {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.dress-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.dress-card:hover {
  transform: translateY(-6px);
  border-color: #d6cac2;
  box-shadow: 0 14px 34px rgba(44, 37, 35, 0.08);
}

.dress-card-media {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background-color: #f5f1ed;
}

.dress-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.dress-card:hover .dress-card-img {
  transform: scale(1.04);
}

.dress-card-badge {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(44, 37, 35, 0.85);
  backdrop-filter: blur(6px);
  color: #ffffff;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.7rem;
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  opacity: 0;
  transform: translateY(6px);
  transition: var(--transition-base);
}

.dress-card:hover .dress-card-badge {
  opacity: 1;
  transform: translateY(0);
}

.dress-card-body {
  padding: 1.25rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.dress-card-collection {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
}

.dress-card-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--fg);
  margin-bottom: 0.75rem;
  flex-grow: 1;
}

.dress-card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg);
  border-top: 1px solid var(--border);
  padding-top: 0.85rem;
  transition: color 0.2s ease;
}

.dress-card:hover .dress-card-action {
  color: var(--accent);
}
</style>

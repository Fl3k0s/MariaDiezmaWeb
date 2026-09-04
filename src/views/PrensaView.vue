<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const API_PRENSA_URL = 'http://localhost:8080/api/v1/prensa'



const articles = ref([])
const isLoading = ref(true)

const SPANISH_MONTHS = {
  'enero': 0,
  'febrero': 1,
  'marzo': 2,
  'abril': 3,
  'mayo': 4,
  'junio': 5,
  'julio': 6,
  'agosto': 7,
  'septiembre': 8,
  'setiembre': 8,
  'octubre': 9,
  'noviembre': 10,
  'diciembre': 11
}

function parsePublicationDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 0

  const cleanStr = dateStr.toLowerCase().trim()
  const yearMatch = cleanStr.match(/\b(19\d\d|20\d\d)\b/)
  const year = yearMatch ? parseInt(yearMatch[1], 10) : null

  let month = null
  for (const [mName, mIndex] of Object.entries(SPANISH_MONTHS)) {
    if (cleanStr.includes(mName)) {
      month = mIndex
      break
    }
  }

  if (year !== null && month !== null) {
    const dayMatch = cleanStr.match(/\b([1-9]|[12]\d|3[01])\b/)
    const day = (dayMatch && dayMatch[1] !== yearMatch[1]) ? parseInt(dayMatch[1], 10) : 1
    return new Date(year, month, day).getTime()
  }

  if (year !== null && month === null) {
    return new Date(year, 0, 1).getTime()
  }

  const parsed = Date.parse(dateStr)
  return isNaN(parsed) ? 0 : parsed
}

function sortArticlesByDateDesc(list) {
  if (!Array.isArray(list)) return []
  return [...list].sort((a, b) => {
    const timeA = parsePublicationDate(a.fecha_publicacion)
    const timeB = parsePublicationDate(b.fecha_publicacion)
    return timeB - timeA // Más moderna primero
  })
}

async function fetchArticles() {
  isLoading.value = true
  try {
    const res = await fetch(API_PRENSA_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }
    const json = await res.json()
    if (json && json.success && Array.isArray(json.data)) {
      articles.value = sortArticlesByDateDesc(json.data)
      return
    }
    throw new Error('Respuesta no válida')
  } catch (err) {
    console.error('[Prensa API] No se pudo obtener datos de ' + API_PRENSA_URL + ':', err)
    articles.value = []
  } finally {
    isLoading.value = false
  }
}

const isModalOpen = ref(false)
const activeArticle = ref({
  nombre_revista: '',
  fecha_publicacion: '',
  titular: '',
  descripcion: '',
  pequena_descripcion: '',
  enlace_articulo: '',
  enlace: ''
})

function openModal(index) {
  activeArticle.value = articles.value[index] || {}
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

function onKeydown(e) {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  fetchArticles()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="prensa-view">
    <div class="page-main container">

      <!-- Encabezado Editorial -->
      <header class="page-header" data-od-id="prensa-page-header">
        <div class="page-title-wrap">
          <div>
            <span class="eyebrow">Archivo de Comunicación & Medios</span>
            <h1 class="page-title">Prensa</h1>
          </div>
          <p class="page-subtitle">
            Una selección de reportajes, piezas audiovisuales y conversaciones con publicaciones de referencia sobre la filosofía y el oficio del atelier de María Diezma.
          </p>
        </div>
      </header>

      <!-- Sección de Video -->
      <section class="video-section" data-od-id="prensa-video-section">
        <div class="video-card">
          <div class="video-player-wrap">
            <iframe
              src="https://www.youtube.com/embed/Y4cyN02TcZY"
              title="María Diezma Atelier"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <!-- Sección de Listado de Artículos -->
      <section class="articles-section" data-od-id="prensa-articles-section">
        <div class="section-label">Listado de Artículos & Reportajes</div>

        <!-- Estado de carga -->
        <div v-if="isLoading" class="articles-loading-state">
          Cargando artículos de prensa...
        </div>

        <!-- Estado vacío -->
        <div v-else-if="articles.length === 0" class="articles-empty-state">
          No se han encontrado artículos de prensa disponibles en este momento.
        </div>

        <!-- Listado dinámico renderizado según el número de elementos de la API -->
        <div v-else class="articles-list">
          <article 
            v-for="(art, idx) in articles" 
            :key="art.id || idx" 
            class="article-item"
            :data-od-id="`article-item-${idx + 1}`"
          >
            <div class="article-meta-col">
              <span class="article-outlet">{{ art.nombre_revista }}</span>
              <time class="article-date">{{ art.fecha_publicacion }}</time>
            </div>
            <div class="article-content-col">
              <h2 class="article-headline">
                <a 
                  :href="art.enlace_articulo || art.enlace || '#'" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style="color: inherit; text-decoration: none;"
                >
                  «{{ art.titular }}»
                </a>
              </h2>
              <p class="article-excerpt">
                {{ art.pequena_descripcion || art.descripcion }}
              </p>
            </div>
            <div class="article-action-col">
              <a 
                :href="art.enlace_articulo || art.enlace || '#'" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-read" 
                :aria-label="`Leer reportaje de ${art.nombre_revista}`"
              >
                <span>Leer artículo</span>
                <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5V3z"/></svg>
              </a>
            </div>
          </article>
        </div>
      </section>

    </div>

    <!-- Modal de Lectura Simple -->
    <div 
      class="modal-backdrop" 
      :class="{ 'is-open': isModalOpen }" 
      @click.self="closeModal"
    >
      <div class="modal-dialog" role="dialog" aria-modal="true">
        <button class="modal-close-btn" aria-label="Cerrar modal" @click="closeModal">
          ✕
        </button>
        <span class="modal-outlet-badge">{{ activeArticle.nombre_revista }}</span>
        <h2 class="modal-title">«{{ activeArticle.titular }}»</h2>
        <div class="modal-meta">
          <span>{{ activeArticle.fecha_publicacion }}</span>
          <span>Publicación Oficial</span>
        </div>
        <div class="modal-body">
          <p>{{ activeArticle.descripcion || activeArticle.pequena_descripcion }}</p>
          <div v-if="activeArticle.enlace_articulo || activeArticle.enlace" class="modal-external-link">
            <a 
              :href="activeArticle.enlace_articulo || activeArticle.enlace" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-read"
            >
              <span>Visitar publicación original en {{ activeArticle.nombre_revista }}</span>
              <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5V3z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prensa-view {
  background-color: var(--bg);
  min-height: calc(100vh - 76px);
}

.page-main {
  max-width: 980px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 5rem;
}

/* Encabezado Editorial */
.page-header {
  margin-bottom: 3.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.page-title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.eyebrow,
.kicker {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-block;
  margin-bottom: 0.5rem;
}

.page-title {
  font-family: var(--font-brand, 'Playfair Display', Georgia, serif);
  font-size: clamp(2.4rem, 4.5vw, 3.6rem);
  font-weight: 400;
  line-height: 1.15;
  color: var(--fg);
  letter-spacing: -0.01em;
}

.page-subtitle {
  max-width: 480px;
  font-size: 1.05rem;
  color: var(--muted);
  font-style: italic;
  font-family: var(--font-brand, 'Playfair Display', Georgia, serif);
  line-height: 1.5;
}

/* Sección de Video */
.video-section {
  margin-bottom: 4rem;
}

.section-label {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--border);
}

.video-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.video-player-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #121212;
}

.video-player-wrap video,
.video-player-wrap iframe {
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
  display: block;
}

/* Sección de Listado de Artículos */
.articles-section {
  margin-bottom: 4rem;
}

.articles-loading-state,
.articles-empty-state {
  padding: 3rem 0;
  text-align: center;
  color: var(--muted);
  font-family: var(--font-mono, monospace);
  font-size: 0.88rem;
}

.articles-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
}

.article-item {
  padding: 1.85rem 0;
  border-bottom: 1px solid var(--border);
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 2rem;
  align-items: baseline;
  transition: background-color 0.15s ease;
}

.article-item:hover .article-headline {
  color: var(--accent);
}

.article-meta-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.article-outlet {
  font-family: var(--font-brand, 'Playfair Display', Georgia, serif);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--fg);
}

.article-date {
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  color: var(--muted);
}

.article-content-col {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.article-headline {
  font-family: var(--font-brand, 'Playfair Display', Georgia, serif);
  font-size: 1.35rem;
  font-weight: 400;
  line-height: 1.35;
  color: var(--fg);
  transition: color 0.2s ease;
  cursor: pointer;
}

.article-excerpt {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.6;
}

.article-action-col {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.btn-read {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  color: var(--fg);
  font-weight: 500;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--surface);
  transition: all 0.2s ease;
  min-height: 44px;
  white-space: nowrap;
  cursor: pointer;
}

.btn-read:hover {
  border-color: var(--accent);
  color: var(--accent);
  background-color: var(--bg);
}

.btn-read svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
  transition: transform 0.2s ease;
}

.btn-read:hover svg {
  transform: translateX(2px);
}

/* Modal de Lectura Simple */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-backdrop.is-open {
  display: flex;
}

.modal-dialog {
  background-color: var(--surface);
  max-width: 680px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
}

.modal-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  border: 1px solid var(--border);
  background-color: var(--bg);
  transition: all 0.2s ease;
  cursor: pointer;
}

.modal-close-btn:hover {
  color: var(--fg);
  border-color: var(--fg);
}

.modal-outlet-badge {
  font-family: var(--font-mono, monospace);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 0.75rem;
  display: inline-block;
}

.modal-title {
  font-family: var(--font-brand, 'Playfair Display', Georgia, serif);
  font-size: 1.85rem;
  line-height: 1.25;
  font-weight: 400;
  color: var(--fg);
  margin-bottom: 1rem;
}

.modal-meta {
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  color: var(--muted);
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  gap: 1.5rem;
}

.modal-body {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--fg);
}

.modal-body p {
  margin-bottom: 1.25rem;
}

.modal-external-link {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

/* Responsive */
@media (max-width: 820px) {
  .article-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .article-action-col {
    justify-content: flex-start;
    margin-top: 0.5rem;
  }
}
</style>

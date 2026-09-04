// Endpoint de la API de prensa
const API_PRENSA_URL = 'http://localhost:8080/api/v1/prensa';

// Estado global de artículos cargados (exclusivamente desde la API)
let articlesData = [];

// Utilidad para escapar texto HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Plantilla para generar el elemento HTML de un artículo
 * @param {Object} article - Datos del artículo retornado por la API
 * @param {number} index - Índice en el array
 * @returns {string} Fragmento HTML
 */
function articleTemplate(article, index) {
  const titular = article.titular || '';
  const revista = article.nombre_revista || 'Prensa';
  const fecha = article.fecha_publicacion || '';
  const descripcion = article.pequena_descripcion || article.descripcion || '';
  const id = article.id || `article-${index}`;
  const enlace = article.enlace_articulo || article.enlace || '#';

  return `
    <article class="article-item" data-id="${escapeHtml(id)}" data-od-id="article-item-${index + 1}">
      <div class="article-meta-col">
        <span class="article-outlet">${escapeHtml(revista)}</span>
        <time class="article-date">${escapeHtml(fecha)}</time>
      </div>
      <div class="article-content-col">
        <h2 class="article-headline">
          <a href="${encodeURI(enlace)}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">
            «${escapeHtml(titular)}»
          </a>
        </h2>
        <p class="article-excerpt">
          ${escapeHtml(descripcion)}
        </p>
      </div>
      <div class="article-action-col">
        <a href="${encodeURI(enlace)}" target="_blank" rel="noopener noreferrer" class="btn-read" aria-label="Leer reportaje de ${escapeHtml(revista)}">
          <span>Leer artículo</span>
          <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5V3z"/></svg>
        </a>
      </div>
    </article>
  `;
}

// Mapeo de nombres de meses en español a índices numéricos (0-11)
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
};

/**
 * Convierte un string de fecha (ej. "Marzo 2026", "Septiembre 2021", "2026-03-15") a timestamp numérico
 * @param {string} dateStr 
 * @returns {number} Timestamp en milisegundos para comparación
 */
function parsePublicationDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 0;

  const cleanStr = dateStr.toLowerCase().trim();

  // 1. Extraer año de 4 dígitos
  const yearMatch = cleanStr.match(/\b(19\d\d|20\d\d)\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : null;

  // 2. Extraer mes en español
  let month = null;
  for (const [mName, mIndex] of Object.entries(SPANISH_MONTHS)) {
    if (cleanStr.includes(mName)) {
      month = mIndex;
      break;
    }
  }

  // Si encontramos año y mes en español
  if (year !== null && month !== null) {
    const dayMatch = cleanStr.match(/\b([1-9]|[12]\d|3[01])\b/);
    const day = (dayMatch && dayMatch[1] !== yearMatch[1]) ? parseInt(dayMatch[1], 10) : 1;
    return new Date(year, month, day).getTime();
  }

  // Si solo encontramos año
  if (year !== null && month === null) {
    return new Date(year, 0, 1).getTime();
  }

  // 3. Fallback a parseo estándar (ISO, etc.)
  const parsed = Date.parse(dateStr);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Ordena la lista de artículos de más moderno a más antiguo
 * @param {Array} list 
 * @returns {Array} Lista ordenada
 */
function sortArticlesByDateDesc(list) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    const timeA = parsePublicationDate(a.fecha_publicacion);
    const timeB = parsePublicationDate(b.fecha_publicacion);
    return timeB - timeA; // Más moderna primero
  });
}

/**
 * Renderiza el listado dinámico de artículos obtenidos de la API
 * @param {Array} list - Lista de artículos
 */
function renderArticles(list) {
  const container = document.getElementById('articlesContainer');
  if (!container) return;

  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = `
      <div style="padding: 3rem 0; text-align: center; color: var(--muted); font-family: var(--font-mono); font-size: 0.9rem;">
        No se han encontrado artículos de prensa disponibles en este momento.
      </div>
    `;
    return;
  }

  // Generación dinámica de la plantilla según los elementos obtenidos exclusivamente del API
  const html = list.map((art, idx) => articleTemplate(art, idx)).join('');
  container.innerHTML = html;
}

/**
 * Realiza la petición GET a la API y renderiza exclusivamente los datos devueltos
 */
async function fetchPrensaArticles() {
  const container = document.getElementById('articlesContainer');
  if (!container) return;

  try {
    const response = await fetch(API_PRENSA_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const payload = await response.json();

    if (payload && payload.success && Array.isArray(payload.data)) {
      articlesData = sortArticlesByDateDesc(payload.data);
      renderArticles(articlesData);
      return;
    }

    throw new Error('Formato de respuesta no válido');
  } catch (err) {
    console.error('[Prensa API] No se pudo recuperar los artículos de ' + API_PRENSA_URL + ':', err);
    articlesData = [];
    renderArticles([]);
  }
}

// Modal de lectura de artículo (si se requiere uso programático)
function openArticleModal(index) {
  const data = articlesData[index];
  if (!data) return;

  const revista = data.nombre_revista || 'Prensa';
  const titular = data.titular || '';
  const fecha = data.fecha_publicacion || '';
  const descripcion = data.descripcion || data.pequena_descripcion || '';
  const enlace = data.enlace_articulo || data.enlace || '';

  const outletElem = document.getElementById('modalOutlet');
  const titleElem = document.getElementById('modalTitle');
  const dateElem = document.getElementById('modalDate');
  const authorElem = document.getElementById('modalAuthor');
  const bodyElem = document.getElementById('modalBody');

  if (outletElem) outletElem.textContent = revista;
  if (titleElem) titleElem.textContent = titular ? `«${titular}»` : '';
  if (dateElem) dateElem.textContent = fecha;
  if (authorElem) authorElem.textContent = 'Publicación Oficial';

  if (bodyElem) {
    let html = `<p>${escapeHtml(descripcion)}</p>`;
    if (enlace) {
      html += `
        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border);">
          <a href="${encodeURI(enlace)}" target="_blank" rel="noopener noreferrer" class="btn-read" style="display: inline-flex;">
            <span>Visitar publicación original en ${escapeHtml(revista)}</span>
            <svg viewBox="0 0 16 16" style="width: 14px; height: 14px;"><path d="M6 3l5 5-5 5V3z"/></svg>
          </a>
        </div>
      `;
    }
    bodyElem.innerHTML = html;
  }

  const modal = document.getElementById('articleModal');
  if (modal) {
    modal.classList.add('is-open');
  }
  document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
  const modal = document.getElementById('articleModal');
  if (modal) {
    modal.classList.remove('is-open');
  }
  document.body.style.overflow = '';
}

function handleBackdropClick(event) {
  if (event.target && event.target.id === 'articleModal') {
    closeArticleModal();
  }
}

// Tecla Escape para cerrar modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeArticleModal();
  }
});

// Inicialización al cargar el documento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchPrensaArticles);
} else {
  fetchPrensaArticles();
}

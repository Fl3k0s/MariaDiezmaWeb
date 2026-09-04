/**
 * María Diezma Atelier - Colecciones y Catálogo Integrado
 */

let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderCatalogGrid();
  renderCollectionsFromApi();
});

// Listado de vestidos recuperados desde el Backoffice
let backofficeDressesList = [];

const BACKOFFICE_API_DRESSES_URL = 'http://localhost:8080/api/v1/vestidos';

/**
 * ==========================================================================
 * LLAMADA A LA API DEL BACKOFFICE PARA RECUPERAR LOS VESTIDOS
 * Endpoint: http://localhost:8080/api/v1/vestidos
 * ==========================================================================
 */
async function fetchDressesFromApi() {
  console.info(`[Backoffice API Request] Realizando llamada GET a ${BACKOFFICE_API_DRESSES_URL}`);
  try {
    const response = await fetch(BACKOFFICE_API_DRESSES_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    console.info('[Backoffice API Response] Vestidos recibidos:', result);
    if (result && result.success && Array.isArray(result.data)) {
      return result.data;
    } else if (Array.isArray(result)) {
      return result;
    }
  } catch (error) {
    console.error(`[Backoffice API] Error al obtener vestidos de ${BACKOFFICE_API_DRESSES_URL}:`, error.message);
  }

  return [];
}

// Renderiza los botones de filtrado según las colecciones presentes en los vestidos
function renderFilterButtons() {
  const container = document.getElementById('filter-buttons-container') || document.querySelector('.filter-group');
  if (!container) return;

  const collectionsMap = new Map();
  backofficeDressesList.forEach(d => {
    const col = d.collection;
    collectionsMap.set(col, (collectionsMap.get(col) || 0) + 1);
  });

  let html = `<span class="filter-label">Colección:</span>`;
  html += `<button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all" onclick="filterDresses('all', this)">Todas las Colecciones (${backofficeDressesList.length})</button>`;

  collectionsMap.forEach((count, colName) => {
    const isActive = activeFilter.toLowerCase() === colName.toLowerCase();
    html += ` <button class="filter-btn ${isActive ? 'active' : ''}" data-filter="${colName}" onclick="filterDresses('${colName}', this)">${colName} (${count})</button>`;
  });

  container.innerHTML = html;
}

// Renderizar la cuadrícula de vestidos recuperada del backoffice (4 columnas)
async function renderCatalogGrid() {
  const grid = document.getElementById('dresses-grid');
  if (!grid) return;

  // 1. Recuperar los diseños desde la API del Backoffice
  if (!backofficeDressesList.length) {
    const rawData = await fetchDressesFromApi();
    backofficeDressesList = rawData.map(d => ({
      id: d.id,
      name: d.nombre || d.name,
      collection: d.coleccion || d.collection,
      imageUrl: resolveCollectionImageUrl(d.ruta_imagen || d.imagen || d.imageUrl)
    }));
    renderFilterButtons();
  }

  grid.innerHTML = '';

  const filtered = backofficeDressesList.filter(d => 
    activeFilter === 'all' || 
    d.collection.trim().toLowerCase() === activeFilter.trim().toLowerCase()
  );

  const countLabel = document.getElementById('catalog-count-label');
  if (countLabel) {
    countLabel.textContent = `Mostrando ${filtered.length} vestidos (API Backoffice)`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0; color: var(--muted); font-family: var(--font-mono); font-size: 0.9rem;">
        No se han encontrado vestidos disponibles en este momento.
      </div>
    `;
    return;
  }

  filtered.forEach((dress) => {
    const cardLink = document.createElement('a');
    // Enviamos como parametros GET el nombre del vestido y la coleccion requeridos por el backoffice
    cardLink.href = `detalle.html?nombre=${encodeURIComponent(dress.name)}&coleccion=${encodeURIComponent(dress.collection)}`;
    cardLink.target = '_blank';
    cardLink.rel = 'noopener noreferrer';
    cardLink.className = 'dress-card-anchor';
    cardLink.title = `Ver detalles de ${dress.name}`;
    cardLink.setAttribute('data-dress-id', dress.id);

    // Mostramos: Imagen, Nombre del vestido y Colección, preservando el id
    cardLink.innerHTML = `
      <article class="dress-card" data-id="${dress.id}" data-dress-id="${dress.id}" data-od-id="card-${dress.id}">
        <!-- 1. IMAGEN -->
        <div class="dress-card-media">
          <img 
            src="${dress.imageUrl}" 
            alt="${dress.name} - Vista Principal" 
            class="dress-card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='../assets/images/romance/MARIA_DIEZMA_001.jpg';"
          >
          <span class="dress-card-tab-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Ver Ficha
          </span>
        </div>
        
        <div class="dress-card-body">
          <!-- 2. COLECCIÓN -->
          <span class="dress-card-collection-tag" style="font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); font-weight: 600;">
            ${dress.collection}
          </span>
          
          <!-- 3. NOMBRE DEL VESTIDO -->
          <h3 class="dress-card-name" style="margin-top: 0.25rem;">${dress.name}</h3>
          
          <div class="dress-card-action" style="margin-top: 0.75rem;">
            <span>Ver detalles</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>
      </article>
    `;

    grid.appendChild(cardLink);
  });
}

// Filtrar vestidos por categoría
function filterDresses(category, btnElement) {
  activeFilter = category;
  if (btnElement) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }
  renderCatalogGrid();
}

function openAppointmentModal(collectionName) {
  if (collectionName) {
    window.location.href = 'cita.html?coleccion=' + encodeURIComponent(collectionName);
  } else {
    window.location.href = 'cita.html';
  }
}

function closeAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formView = document.getElementById('modal-form-view');
  const confirmView = document.getElementById('modal-confirmation-view');
  const selectElem = document.getElementById('input-collection');
  const confirmedTarget = document.getElementById('confirmed-collection');

  if (selectElem && confirmedTarget) {
    confirmedTarget.textContent = selectElem.value;
  }

  if (formView && confirmView) {
    formView.style.display = 'none';
    confirmView.style.display = 'block';
  }
}

// Cerrar modal al hacer clic en el fondo
const modalBackdrop = document.getElementById('appointment-modal');
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', function(e) {
    if (e.target === this) {
      closeAppointmentModal();
    }
  });
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAppointmentModal();
  }
});

/**
 * ==========================================================================
 * LLAMADA A LA API DEL BACKOFFICE PARA RECUPERAR COLECCIONES
 * Endpoint: http://localhost:8080/api/v1/colecciones
 * ==========================================================================
 */
const BACKOFFICE_API_COLLECTIONS_URL = 'http://localhost:8080/api/v1/colecciones';

async function fetchCollectionsFromApi() {
  console.info(`[Backoffice API Request] Realizando llamada GET a ${BACKOFFICE_API_COLLECTIONS_URL}`);
  
  try {
    const response = await fetch(BACKOFFICE_API_COLLECTIONS_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.info('[Backoffice API Response] Respuesta exitosa:', result);

    if (result && result.success && Array.isArray(result.data)) {
      return result.data;
    } else if (Array.isArray(result)) {
      return result;
  } catch (error) {
    console.error(`[Backoffice API] Error al obtener colecciones de ${BACKOFFICE_API_COLLECTIONS_URL}:`, error.message);
  }

  return [];
}

/**
 * Resuelve la ruta de la imagen según la ubicación de pages/colecciones.html
 */
function resolveCollectionImageUrl(imgPath) {
  if (!imgPath) return '';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) {
    return imgPath;
  }
  const clean = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  return '../' + clean;
}

/**
 * Renderiza dinámicamente las colecciones recibidas de la API
 * Cada colección muestra imagen a un lado, y nombre y descripción al otro.
 */
async function renderCollectionsFromApi() {
  const container = document.getElementById('collections-stack') || document.getElementById('backoffice-collection-container');
  if (!container) return;

  // 1. Obtener los datos desde la API
  const collections = await fetchCollectionsFromApi();

  if (!collections || !collections.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--muted); font-family: var(--font-mono); font-size: 0.9rem;">
        No se han encontrado colecciones disponibles en este momento.
      </div>
    `;
    return;
  }

  // 2. Pintar en el DOM las colecciones: imagen a un lado y nombre/descripción al otro lado
  container.innerHTML = collections.map((col, index) => {
    const isReverse = index % 2 === 1;
    const colNum = String(index + 1).padStart(2, '0');
    const imgSrc = resolveCollectionImageUrl(col.imagen);

    return `
      <article class="collection-block ${isReverse ? 'block-reverse' : ''}" data-id="${col.id}" data-od-id="collection-block-${col.id}">
        <!-- LADO 1: IMAGEN DE LA COLECCIÓN -->
        <div class="collection-visual" data-od-id="visual-${col.id}">
          <img 
            src="${imgSrc}" 
            alt="Colección ${col.nombre} - María Diezma Atelier" 
            class="collection-img"
            loading="lazy"
            onerror="this.onerror=null; this.src='../assets/images/romance/MARIA_DIEZMA_001.jpg';"
          >
          <div class="collection-badge-overlay">Colección ${colNum}</div>
        </div>

        <!-- LADO 2: NOMBRE Y DESCRIPCIÓN DE LA COLECCIÓN -->
        <div class="collection-content" data-od-id="content-${col.id}">
          <div>
            <div class="collection-header-meta">
              <span class="collection-number">${colNum} / Colección</span>
              <span class="collection-season">Atelier María Diezma</span>
            </div>
            
            <h2 class="collection-title">${col.nombre}</h2>
            
            <p class="collection-desc">
              ${col.descripcion}
            </p>
          </div>

          <!-- ACCIONES -->
          <div class="collection-actions">
            <a 
              href="cita.html?coleccion=${encodeURIComponent(col.id)}" 
              class="btn-secondary" 
              data-od-id="btn-cita-${col.id}"
            >
              Probar esta línea en el Atelier
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}


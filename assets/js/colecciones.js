/**
 * María Diezma Atelier - Colecciones y Catálogo Integrado
 */

let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderCatalogGrid();
  renderBackofficeCollection();
});

// Listado de vestidos recuperados desde el Backoffice (Prototipo)
let backofficeDressesList = [];

/**
 * ==========================================================================
 * RECUPERACIÓN DE DISEÑOS DESDE BACKOFFICE (PROTOTIPO)
 * ==========================================================================
 * Simula la respuesta del servicio backoffice con la lista de vestidos.
 * Retorna los datos requeridos: id, name, collection, collectionName e imageUrl.
 */
function getBackofficeDressesData() {
  if (typeof DRESSES_DATA !== 'undefined' && Array.isArray(DRESSES_DATA)) {
    return DRESSES_DATA.map(d => ({
      id: d.id,
      name: d.name,
      collection: d.collection,
      collectionName: d.collectionName || (d.collection === 'siluetas' ? 'Colección Siluetas Puras' : 'Colección Botánica & Bordados'),
      imageUrl: d.images ? d.images.front : d.imageUrl
    }));
  }
  return [];
}

// Renderizar la cuadrícula de vestidos recuperada del backoffice (4 columnas)
function renderCatalogGrid() {
  const grid = document.getElementById('dresses-grid');
  if (!grid) return;

  // 1. Recuperar los diseños desde el Backoffice
  if (!backofficeDressesList.length) {
    backofficeDressesList = getBackofficeDressesData();
  }

  grid.innerHTML = '';

  const filtered = backofficeDressesList.filter(d => activeFilter === 'all' || d.collection === activeFilter);
  const countLabel = document.getElementById('catalog-count-label');
  if (countLabel) {
    countLabel.textContent = `Mostrando ${filtered.length} vestidos (Backoffice)`;
  }

  filtered.forEach((dress) => {
    const cardLink = document.createElement('a');
    // Guardamos el id del vestido en el enlace y atributos de datos para la posterior consulta de detalle
    cardLink.href = `detalle.html?vestido=${encodeURIComponent(dress.id)}`;
    cardLink.target = '_blank';
    cardLink.rel = 'noopener noreferrer';
    cardLink.className = 'dress-card-anchor';
    cardLink.title = `Ver ${dress.name} (${dress.collectionName})`;
    cardLink.setAttribute('data-dress-id', dress.id);

    // Mostramos: Imagen, Nombre del vestido y Colección, preservando el id
    cardLink.innerHTML = `
      <article class="dress-card" data-id="${dress.id}" data-dress-id="${dress.id}" data-od-id="card-${dress.id}">
        <!-- 1. IMAGEN -->
        <div class="dress-card-media">
          <img src="${dress.imageUrl}" alt="${dress.name} - Vista Principal" class="dress-card-img" loading="lazy">
          <span class="dress-card-tab-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Ver Ficha
          </span>
        </div>
        
        <div class="dress-card-body">
          <!-- 2. COLECCIÓN -->
          <span class="dress-card-collection-tag" style="font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); font-weight: 600;">
            ${dress.collectionName}
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
 * BLOQUE DE RECUPERACIÓN DE BACKOFFICE (PROTOTIPO)
 * ==========================================================================
 * Simula la obtención de datos de colecciones desde el backoffice sin llamada
 * web HTTP real por tratarse de un prototipo.
 */
function getBackofficeCollectionData() {
  // Prototipo: Datos devueltos por el servicio de Backoffice
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
    ctaUrl: "cita.html?coleccion=seda-bruma"
  };
}

function renderBackofficeCollection() {
  const container = document.getElementById('backoffice-collection-container');
  if (!container) return;

  // 1. Recuperar los datos del backoffice (prototipo)
  const collection = getBackofficeCollectionData();

  // 2. Pintar en el DOM únicamente imagen a un lado y nombre/descripción al otro lado
  container.innerHTML = `
    <article class="collection-block" data-od-id="collection-block-backoffice">
      <!-- LADO 1: IMAGEN DE LA COLECCIÓN -->
      <div class="collection-visual" data-od-id="visual-backoffice">
        <img 
          src="${collection.imageUrl}" 
          alt="${collection.imageAlt}" 
          class="collection-img"
          loading="lazy"
        >
        <div class="collection-badge-overlay">${collection.badge}</div>
      </div>

      <!-- LADO 2: NOMBRE Y DESCRIPCIÓN DE LA COLECCIÓN -->
      <div class="collection-content" data-od-id="content-backoffice">
        <div>
          <div class="collection-header-meta">
            <span class="collection-number">${collection.collectionNumber}</span>
            <span class="collection-season">${collection.seasonTag}</span>
          </div>
          
          <h2 class="collection-title">${collection.name}</h2>
          
          <p class="collection-desc">
            ${collection.description}
          </p>
        </div>

        <!-- ACCIONES -->
        <div class="collection-actions">
          <a href="${collection.ctaUrl}" class="btn-secondary" data-od-id="btn-cita-backoffice">
            ${collection.ctaText}
          </a>
          <span style="font-size: 0.78rem; color: var(--muted); font-family: var(--font-mono); letter-spacing: 0.05em;">
            ✦ Registro cargado desde el Backoffice (Prototipo)
          </span>
        </div>
      </div>
    </article>
  `;
}


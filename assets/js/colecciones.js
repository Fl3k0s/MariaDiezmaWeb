/**
 * María Diezma Atelier - Colecciones y Catálogo Integrado
 */

let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderCatalogGrid();
});

// Renderizar la cuadrícula de vestidos (4 columnas)
function renderCatalogGrid() {
  const grid = document.getElementById('dresses-grid');
  if (!grid || typeof DRESSES_DATA === 'undefined') return;

  grid.innerHTML = '';

  const filtered = DRESSES_DATA.filter(d => activeFilter === 'all' || d.collection === activeFilter);
  const countLabel = document.getElementById('catalog-count-label');
  if (countLabel) {
    countLabel.textContent = `Mostrando ${filtered.length} vestidos`;
  }

  filtered.forEach((dress) => {
    const cardLink = document.createElement('a');
    cardLink.href = `detalle.html?vestido=${dress.id}`;
    cardLink.target = '_blank';
    cardLink.rel = 'noopener noreferrer';
    cardLink.className = 'dress-card-anchor';
    cardLink.title = `Abrir ${dress.name} en una nueva ventana`;

    cardLink.innerHTML = `
      <article class="dress-card" data-id="${dress.id}" data-od-id="card-${dress.id}">
        <div class="dress-card-media">
          <img src="${dress.images.front}" alt="${dress.name} - Vista Principal" class="dress-card-img" loading="lazy">
          <span class="dress-card-tag">${dress.collection === 'siluetas' ? 'Siluetas Puras' : 'Botánica'}</span>
          <span class="dress-card-tab-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Abrir Ficha ↗
          </span>
        </div>
        <div class="dress-card-body">
          <h3 class="dress-card-name">${dress.name}</h3>
          <p class="dress-card-meta">${dress.fabric}</p>
          <div class="dress-card-action">
            <span>Ver imagen y contra parte</span>
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

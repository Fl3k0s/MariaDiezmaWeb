/**
 * María Diezma Atelier - Controlador de la Ficha de Detalle de Vestido
 */

let currentDressIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initDressDetailPage();
});

function initDressDetailPage() {
  if (typeof DRESSES_DATA === 'undefined' || !DRESSES_DATA.length) {
    console.error('DRESSES_DATA no está disponible.');
    return;
  }

  // 1. Obtener el vestido solicitado por URL (?vestido=altea)
  const urlParams = new URLSearchParams(window.location.search);
  const dressId = urlParams.get('vestido');

  let targetIndex = 0;
  if (dressId) {
    const foundIndex = DRESSES_DATA.findIndex(d => d.id.toLowerCase() === dressId.toLowerCase());
    if (foundIndex !== -1) {
      targetIndex = foundIndex;
    }
  }

  // 2. Cargar el vestido
  loadDressIntoShowcase(targetIndex);
}

function loadDressIntoShowcase(index) {
  currentDressIndex = index;
  const dress = DRESSES_DATA[index];

  // Actualizar títulos y miga de pan
  document.title = `${dress.name} · María Diezma Atelier`;
  const breadcrumbEl = document.getElementById('breadcrumb-dress-name');
  if (breadcrumbEl) breadcrumbEl.textContent = dress.name;

  // Actualizar textos informativos
  document.getElementById('detail-dress-name').textContent = dress.name;
  document.getElementById('detail-dress-description').textContent = dress.description;
  document.getElementById('detail-collection-kicker').textContent = `${dress.collectionName} · Atelier María Diezma`;
  document.getElementById('showcase-model-id').textContent = `REF. ${dress.ref}`;
  document.getElementById('detail-fabric').textContent = dress.fabric;
  document.getElementById('detail-back').textContent = dress.back;
  document.getElementById('detail-silhouette').textContent = dress.silhouette;
  document.getElementById('detail-time').textContent = dress.time;
  document.getElementById('model-step-counter').textContent = `${index + 1} de ${DRESSES_DATA.length}`;
  document.getElementById('btn-detail-book-appointment').href = `cita.html?vestido=${dress.id}`;

  // Actualizar imagen principal grande
  const mainImg = document.getElementById('main-dress-image');
  mainImg.src = dress.images.front;
  mainImg.alt = `${dress.name} - Vista Principal Delantera`;
  document.getElementById('main-view-label').textContent = 'Vista Delantera · Silueta Principal';

  // Actualizar miniaturas de contraparte y vistas
  const thumbsContainer = document.getElementById('thumbnails-container');
  thumbsContainer.innerHTML = `
    <button class="thumb-btn active" onclick="switchLargeImage('${dress.images.front}', 'Vista Delantera · Silueta Principal', this)" title="Ver vista delantera">
      <img src="${dress.images.front}" alt="Vista delantera">
      <span class="thumb-caption">Delantera</span>
    </button>
    <button class="thumb-btn is-contraparte" onclick="switchLargeImage('${dress.images.back}', 'Contra Parte · Espalda & Escote Trasero', this)" title="Ver contra parte (espalda)">
      <img src="${dress.images.back}" alt="Contra parte trasera">
      <span class="thumb-caption">Contra Parte</span>
    </button>
    <button class="thumb-btn" onclick="switchLargeImage('${dress.images.detail}', 'Detalle de Tejido & Acabados', this)" title="Ver detalle de costura">
      <img src="${dress.images.detail}" alt="Detalle de tejido">
      <span class="thumb-caption">Tejido</span>
    </button>
    <button class="thumb-btn" onclick="switchLargeImage('${dress.images.movement}', 'Silueta en Movimiento & Caída', this)" title="Ver caída y movimiento">
      <img src="${dress.images.movement}" alt="Caída y movimiento">
      <span class="thumb-caption">Caída</span>
    </button>
  `;

  // Sincronizar URL del navegador de forma limpia sin recargar
  const newUrl = `${window.location.pathname}?vestido=${dress.id}`;
  window.history.replaceState({ dressId: dress.id }, '', newUrl);
}

function switchLargeImage(src, captionText, thumbBtn) {
  const mainImg = document.getElementById('main-dress-image');
  mainImg.style.opacity = '0.3';
  
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = '1';
    document.getElementById('main-view-label').textContent = captionText;
  }, 150);

  document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  if (thumbBtn) thumbBtn.classList.add('active');
}

function navigateDress(direction) {
  let next = currentDressIndex + direction;
  if (next < 0) next = DRESSES_DATA.length - 1;
  if (next >= DRESSES_DATA.length) next = 0;
  loadDressIntoShowcase(next);
}

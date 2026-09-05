/**
 * María Diezma Atelier - Controlador de la Ficha de Detalle de Vestido
 * Recupera la información del vestido mediante petición GET a la API del Backoffice:
 * Endpoint: http://localhost:8080/api/v1/vestidos/detalle?nombre=...&coleccion=...
 */

let currentDress = null;
const BACKOFFICE_API_DRESS_DETAIL_URL = 'http://localhost:8080/api/v1/vestidos/detalle';

document.addEventListener('DOMContentLoaded', () => {
  initDressDetailPage();
});

/**
 * Resuelve la ruta de imagen para su visualización desde pages/detalle.html
 */
function resolveDetailImageUrl(imgPath) {
  if (!imgPath) return '../assets/images/romance/MARIA_DIEZMA_001.jpg';
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://') || imgPath.startsWith('data:')) {
    return imgPath;
  }
  const clean = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  return '../' + clean;
}

/**
 * ==========================================================================
 * PETICIÓN GET AL BACKOFFICE PARA RECUPERAR DETALLES DEL VESTIDO
 * Endpoint: http://localhost:8080/api/v1/vestidos/detalle?nombre=...&coleccion=...
 * ==========================================================================
 */
async function fetchBackofficeDressDetail(nombre, coleccion) {
  const queryParams = new URLSearchParams();
  if (nombre) queryParams.append('nombre', nombre);
  if (coleccion) queryParams.append('coleccion', coleccion);

  const requestUrl = `${BACKOFFICE_API_DRESS_DETAIL_URL}?${queryParams.toString()}`;
  console.info(`[Backoffice API Request] Realizando llamada GET a: ${requestUrl}`);

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.info('[Backoffice API Response] Detalle del vestido recibido:', result);

    if (result && result.success && result.data) {
      return result.data;
    }
  } catch (error) {
    console.error(`[Backoffice API] Error al obtener detalle de ${requestUrl}:`, error.message);
  }

  return null;
}

async function initDressDetailPage() {
  // 1. Extraer los datos enviados desde colecciones.html mediante query string
  const urlParams = new URLSearchParams(window.location.search);
  const nombreParam = urlParams.get('nombre') || '';
  const coleccionParam = urlParams.get('coleccion') || '';

  // 2. Ejecutar la petición GET al backoffice con el nombre del vestido y la colección
  const dress = await fetchBackofficeDressDetail(nombreParam, coleccionParam);

  if (!dress) {
    console.error('No se pudo recuperar el detalle del vestido desde el backoffice.');
    return;
  }

  loadDressIntoShowcase(dress);
}

function loadDressIntoShowcase(dress) {
  currentDress = dress;

  const dressName = dress.nombre || 'Vestido de Atelier';
  const collectionName = dress.coleccion || 'Colección Atelier';
  const dressDesc = dress.descripcion || 'Diseño exclusivo confeccionado a medida en nuestro atelier de Madrid.';
  const dressId = dress.id || 'MD-VESTIDO';

  // 1. Actualizar títulos y miga de pan
  document.title = `${dressName} · ${collectionName} · María Diezma Atelier`;
  const breadcrumbEl = document.getElementById('breadcrumb-dress-name');
  if (breadcrumbEl) breadcrumbEl.textContent = dressName;

  const breadcrumbColLink = document.getElementById('breadcrumb-collection-link');
  if (breadcrumbColLink) {
    breadcrumbColLink.textContent = `Colección ${collectionName}`;
    breadcrumbColLink.href = `colecciones.html?filtro=${encodeURIComponent(collectionName)}`;
  }

  // 2. Actualizar textos informativos
  const nameEl = document.getElementById('detail-dress-name');
  if (nameEl) nameEl.textContent = dressName;

  const descEl = document.getElementById('detail-dress-description');
  if (descEl) descEl.textContent = dressDesc;

  const kickerEl = document.getElementById('detail-collection-kicker');
  if (kickerEl) kickerEl.textContent = `Colección ${collectionName} · Atelier María Diezma`;

  // Botón de pedir cita
  const ctaBtn = document.getElementById('btn-detail-book-appointment');
  if (ctaBtn) {
    ctaBtn.href = `cita.html?vestido=${encodeURIComponent(dressId)}&nombre=${encodeURIComponent(dressName)}&coleccion=${encodeURIComponent(collectionName)}`;
  }

  // 3. Resolver imágenes (ruta_imagen_1, ruta_imagen_2, ruta_imagen_3)
  const raw1 = dress.ruta_imagen_1 || '';
  const raw2 = dress.ruta_imagen_2 || '';
  const raw3 = dress.ruta_imagen_3 || '';

  // Determinar vista trasera y zoom según convenciones del atelier (002 = zoom / detalle, 003 = trasera / contra parte)
  let rawTrasera = raw3 || raw2 || raw1;
  let rawZoom = raw2 || raw3 || raw1;

  if (raw2.includes('003') || raw2.toLowerCase().includes('trasera') || raw2.toLowerCase().includes('back') || raw2.toLowerCase().includes('espalda')) {
    rawTrasera = raw2;
    rawZoom = raw3 || raw2;
  } else if (raw3.includes('003') || raw3.toLowerCase().includes('trasera') || raw3.toLowerCase().includes('back') || raw3.toLowerCase().includes('espalda') ||
             raw2.includes('002') || raw2.toLowerCase().includes('zoom') || raw2.toLowerCase().includes('detalle')) {
    rawTrasera = raw3;
    rawZoom = raw2;
  }

  const imgDelantera = resolveDetailImageUrl(raw1);
  const imgTrasera = resolveDetailImageUrl(rawTrasera);
  const imgZoom = resolveDetailImageUrl(rawZoom);

  // 4. Imagen principal grande (sin pie de foto)
  const mainImg = document.getElementById('main-dress-image');
  if (mainImg) {
    mainImg.src = imgDelantera;
    mainImg.alt = `${dressName} - Vista Principal`;
    mainImg.onerror = function() {
      this.onerror = null;
      this.src = '../assets/images/romance/MARIA_DIEZMA_001.jpg';
    };
  }

  // 5. Miniaturas interactivas (3 imágenes reducidas: DELANTERA, TRASERA y ZOOM)
  const thumbsContainer = document.getElementById('thumbnails-container');
  if (thumbsContainer) {
    thumbsContainer.innerHTML = `
      <button class="thumb-btn active" onclick="switchLargeImage('${imgDelantera}', this)" title="Ver vista delantera">
        <img src="${imgDelantera}" alt="Vista delantera" onerror="this.src='../assets/images/romance/MARIA_DIEZMA_001.jpg'">
        <span class="thumb-caption">DELANTERA</span>
      </button>
      <button class="thumb-btn is-contraparte" onclick="switchLargeImage('${imgTrasera}', this)" title="Ver vista trasera">
        <img src="${imgTrasera}" alt="Vista trasera" onerror="this.src='../assets/images/romance/MARIA_DIEZMA_003.jpg'">
        <span class="thumb-caption">TRASERA</span>
      </button>
      <button class="thumb-btn" onclick="switchLargeImage('${imgZoom}', this)" title="Ver zoom del vestido">
        <img src="${imgZoom}" alt="Vista zoom" onerror="this.src='../assets/images/romance/MARIA_DIEZMA_002.jpg'">
        <span class="thumb-caption">ZOOM</span>
      </button>
    `;
  }
}

function switchLargeImage(src, thumbBtn) {
  const mainImg = document.getElementById('main-dress-image');
  if (!mainImg) return;

  mainImg.style.opacity = '0.3';
  
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = '1';
  }, 150);

  document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  if (thumbBtn) thumbBtn.classList.add('active');
}

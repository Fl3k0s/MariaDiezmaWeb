// CONFIGURACIÓN DE API DEL BACKOFFICE
const VITE_BACKOFFICE_URI =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKOFFICE_URI) ||
  (typeof window !== 'undefined' && window.VITE_BACKOFFICE_URI && !window.VITE_BACKOFFICE_URI.startsWith('%') ? window.VITE_BACKOFFICE_URI : null) ||
  'http://localhost:8080/api';

function getApiBaseUrl() {
  const base = (typeof window !== 'undefined' && window.VITE_BACKOFFICE_URI) || VITE_BACKOFFICE_URI;
  const clean = base.replace(/\/$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
}

// Endpoint de creación de citas: {{url}}/api/v1/citas
const API_CITAS_URL = (typeof window !== 'undefined' && window.API_CITAS_URL) || `${getApiBaseUrl()}/v1/citas`;

// ESTADO DE LA RESERVA
const APPOINTMENT_TYPES = [
  {
    id: 'novia',
    title: 'Novia',
    fullTitle: 'Vestido de Novia a Medida',
    duration: '1h 30min',
    description: 'Encuentro privado para la novia y sus acompañantes. Modelado sobre silueta, elección de sedas naturales (crepé, mikado, organza) y diseño exclusivo de alta costura nupcial.'
  },
  {
    id: 'fiesta',
    title: 'Fiesta',
    fullTitle: 'Vestido de Fiesta, Gala & Madrina',
    duration: '1h 30min',
    description: 'Asesoramiento personalizado para madrinas e invitadas de honor. Elección de cortes favorecedores, pedrerías artesanales y tejidos fluidos con patronaje a medida.'
  },
  {
    id: 'comunion',
    title: 'Comunión',
    fullTitle: 'Vestido de Primera Comunión a Medida',
    duration: '1h 30min',
    description: 'Creaciones delicadas para niñas confeccionadas en linos rústicos, sedas naturales y encajes de valenciennes. Un trato dulce y sosegado para la protagonista.'
  }
];

let currentTypeIndex = 0;
let fiestaSubtype = 'Madrina'; // 'Madrina' | 'Fiesta' dentro de Fiesta
let selectedTime = '10:00 - 11:30';
let selectedFranja = 'Mañana (10:00 - 11:30)';

// Fecha actual a medianoche (para deshabilitar el día de hoy y días pasados)
const today = new Date();
today.setHours(0, 0, 0, 0);

// Obtener la primera fecha válida seleccionable (a partir de mañana, excluyendo domingos)
function getFirstAvailableDate() {
  const d = new Date(today);
  d.setDate(d.getDate() + 1); // Como mínimo mañana
  while (d.getDay() === 0) { // Si es domingo, pasar al lunes
    d.setDate(d.getDate() + 1);
  }
  return d;
}

let selectedDate = getFirstAvailableDate();
let currentMonth = selectedDate.getMonth();
let currentYear = selectedDate.getFullYear();

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  updateTimeSlotsAvailability();
  updateTypeDetailContent();
  updateSummary();
});

// GESTIÓN DEL SLIDER DE TIPO DE CITA
function setAppointmentType(index) {
  currentTypeIndex = parseInt(index, 10);
  
  // Actualizar control range
  const rangeEl = document.getElementById('appointment-range');
  if (rangeEl) rangeEl.value = currentTypeIndex;
  
  // Mover la píldora indicadora
  const indicator = document.getElementById('slider-indicator');
  if (indicator) {
    indicator.style.transform = `translateX(${currentTypeIndex * 100}%)`;
  }

  // Actualizar clases activas en botones tab
  ['tab-novia', 'tab-fiesta', 'tab-comunion'].forEach((tabId, idx) => {
    const btn = document.getElementById(tabId);
    if (btn) {
      const isActive = idx === currentTypeIndex;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-checked', isActive.toString());
    }
  });

  // Mostrar u ocultar el subapartado de Madrina dentro de Fiesta
  const fiestaSubtypeContainer = document.getElementById('fiesta-subtype-container');
  const isFiesta = currentTypeIndex === 1;
  if (fiestaSubtypeContainer) {
    fiestaSubtypeContainer.style.display = isFiesta ? 'block' : 'none';
  }

  updateTypeDetailContent();
  updateSummary();
}

function setFiestaSubtype(subtype) {
  fiestaSubtype = subtype; // 'Madrina' o 'Fiesta'

  const madrinaBtn = document.getElementById('sub-madrina-btn');
  const fiestaBtn = document.getElementById('sub-fiesta-btn');

  if (madrinaBtn) {
    const isMadrina = subtype === 'Madrina';
    madrinaBtn.classList.toggle('active', isMadrina);
    madrinaBtn.setAttribute('aria-checked', isMadrina.toString());
  }

  if (fiestaBtn) {
    const isFiesta = subtype === 'Fiesta';
    fiestaBtn.classList.toggle('active', isFiesta);
    fiestaBtn.setAttribute('aria-checked', isFiesta.toString());
  }

  updateTypeDetailContent();
  updateSummary();
}

function updateTypeDetailContent() {
  const pill = document.getElementById('active-type-pill');
  const titleEl = document.getElementById('type-detail-title');
  const textEl = document.getElementById('type-detail-text');
  const detail = APPOINTMENT_TYPES[currentTypeIndex];

  if (currentTypeIndex === 1) {
    if (fiestaSubtype === 'Madrina') {
      if (pill) pill.textContent = 'Fiesta · Madrina';
      if (titleEl) titleEl.innerHTML = 'Vestido de Madrina & Gala a Medida <span>1h 30min</span>';
      if (textEl) textEl.textContent = 'Asesoramiento exclusivo para madrinas y acompañantes principales. Elección de cortes favorecedores, pedrerías artesanales y tejidos nobles con patronaje a medida.';
    } else {
      if (pill) pill.textContent = 'Fiesta · Invitada';
      if (titleEl) titleEl.innerHTML = 'Vestido de Fiesta e Invitada de Gala <span>1h 30min</span>';
      if (textEl) textEl.textContent = 'Creaciones exclusivas de alta costura para invitadas distinguidas y eventos de gala, confeccionadas artesanalmente en nuestro taller de Madrid.';
    }
  } else {
    if (pill) pill.textContent = detail.title;
    if (titleEl) titleEl.innerHTML = `${detail.fullTitle} <span>${detail.duration}</span>`;
    if (textEl) textEl.textContent = detail.description;
  }
}

function onRangeSliderChange(val) {
  setAppointmentType(val);
}

    // GESTIÓN DE TRAMOS HORARIOS (4 TRAMOS)
    function selectTimeSlot(slotString, btnElement, franjaString) {
      if (btnElement && (btnElement.disabled || btnElement.classList.contains('disabled'))) {
        return;
      }
      selectedTime = slotString;
      selectedFranja = franjaString || (btnElement && btnElement.getAttribute('data-franja')) || (slotString.startsWith('10') || slotString.startsWith('11') ? `Mañana (${slotString})` : `Tarde (${slotString})`);
      
      // Quitar clase selected a los demás
      document.querySelectorAll('.time-slot-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-checked', 'false');
      });
      
      if (btnElement) {
        btnElement.classList.add('selected');
        btnElement.setAttribute('aria-checked', 'true');
      }
      
      updateSummary();
    }

    // DISPONIBILIDAD DE TRAMOS HORARIOS SEGÚN EL DÍA (SÁBADOS SOLO MAÑANAS)
    function updateTimeSlotsAvailability() {
      if (!selectedDate) return;
      const isSaturday = selectedDate.getDay() === 6;
      const afternoonSlotIds = ['slot-3', 'slot-4'];

      afternoonSlotIds.forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const tag = btn.querySelector('.slot-tag');

        if (isSaturday) {
          btn.disabled = true;
          btn.classList.add('disabled');
          btn.setAttribute('aria-disabled', 'true');
          if (tag) {
            tag.textContent = 'No disponible';
            tag.classList.add('tag-disabled');
          }
          btn.title = 'Los sábados solo abrimos en horario de mañana';
        } else {
          btn.disabled = false;
          btn.classList.remove('disabled');
          btn.removeAttribute('aria-disabled');
          if (tag) {
            tag.textContent = 'Disponible';
            tag.classList.remove('tag-disabled');
          }
          btn.removeAttribute('title');
        }
      });

      // Mostrar/ocultar aviso informativo para los sábados
      const saturdayNotice = document.getElementById('saturday-notice');
      if (saturdayNotice) {
        saturdayNotice.style.display = isSaturday ? 'block' : 'none';
      }

      // Si es sábado y el turno actual es de tarde, cambiar al primer turno de mañana
      if (isSaturday && (selectedTime === '17:00 - 18:30' || selectedTime === '18:30 - 20:00')) {
        const morningSlotBtn = document.getElementById('slot-1');
        if (morningSlotBtn) {
          selectTimeSlot('10:00 - 11:30', morningSlotBtn, 'Mañana (10:00 - 11:30)');
        } else {
          selectedTime = '10:00 - 11:30';
          selectedFranja = 'Mañana (10:00 - 11:30)';
          updateSummary();
        }
      }
    }

    // CALENDARIO MENSUAL
    function renderCalendar() {
      const label = document.getElementById('calendar-month-label');
      const grid = document.getElementById('calendar-grid');
      if (!label || !grid) return;

      label.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
      grid.innerHTML = '';

      // Actualizar estado interactivo del botón de mes anterior
      const prevBtn = document.getElementById('prev-month-btn');
      if (prevBtn) {
        const isCurrentOrPastMonth = (currentYear < today.getFullYear()) ||
          (currentYear === today.getFullYear() && currentMonth <= today.getMonth());
        prevBtn.disabled = isCurrentOrPastMonth;
        prevBtn.style.opacity = isCurrentOrPastMonth ? '0.35' : '1';
        prevBtn.style.cursor = isCurrentOrPastMonth ? 'not-allowed' : 'pointer';
      }

      // Actualizar estado interactivo del botón de mes siguiente (máximo 1 mes desde el actual)
      const nextBtn = document.getElementById('next-month-btn');
      if (nextBtn) {
        const maxAllowedMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        const isMaxMonth = (currentYear > maxAllowedMonthDate.getFullYear()) ||
          (currentYear === maxAllowedMonthDate.getFullYear() && currentMonth >= maxAllowedMonthDate.getMonth());
        nextBtn.disabled = isMaxMonth;
        nextBtn.style.opacity = isMaxMonth ? '0.35' : '1';
        nextBtn.style.cursor = isMaxMonth ? 'not-allowed' : 'pointer';
      }

      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // En España la semana empieza en Lunes (0 = Lun, 6 = Dom)
      let startingDay = firstDayOfMonth.getDay() - 1;
      if (startingDay === -1) startingDay = 6;

      // Huecos iniciales
      for (let i = 0; i < startingDay; i++) {
        const blank = document.createElement('div');
        blank.className = 'calendar-day disabled';
        blank.setAttribute('aria-hidden', 'true');
        grid.appendChild(blank);
      }

      // Días del mes
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(currentYear, currentMonth, day);
        dateObj.setHours(0, 0, 0, 0);

        const dayOfWeek = dateObj.getDay(); // 0 = Domingo
        const isSunday = dayOfWeek === 0;
        const isToday = dateObj.getTime() === today.getTime();
        const isPastOrToday = dateObj.getTime() <= today.getTime();

        const dayBtn = document.createElement('button');
        dayBtn.type = 'button';
        dayBtn.className = 'calendar-day';
        dayBtn.textContent = day;

        if (isToday) {
          dayBtn.classList.add('today');
        }

        const isSelected = selectedDate && 
                           selectedDate.getDate() === day && 
                           selectedDate.getMonth() === currentMonth && 
                           selectedDate.getFullYear() === currentYear;

        if (isSelected && !isPastOrToday && !isSunday) {
          dayBtn.classList.add('selected');
        }

        if (isPastOrToday) {
          dayBtn.classList.add('disabled', 'past-day');
          dayBtn.disabled = true;
          dayBtn.title = isToday
            ? 'No es posible solicitar cita para el día actual'
            : 'Fecha pasada no disponible';
        } else if (isSunday) {
          dayBtn.classList.add('sunday');
          dayBtn.disabled = true;
          dayBtn.title = 'Domingo cerrado';
        } else {
          dayBtn.onclick = () => {
            selectedDate = dateObj;
            renderCalendar();
            updateTimeSlotsAvailability();
            updateSummary();
          };
        }

        grid.appendChild(dayBtn);
      }
    }

    function prevMonth() {
      const prevDate = new Date(currentYear, currentMonth - 1, 1);
      const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      if (prevDate < currentMonthStart) {
        return; // No permitir retroceder a meses anteriores al actual
      }

      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    }

    function nextMonth() {
      const maxAllowedMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
      if (nextMonthDate > maxAllowedMonthDate) {
        return; // No permitir avanzar más de 1 mes desde el actual
      }

      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    }

    // ACTUALIZACIÓN DE RESUMEN
    function updateSummary() {
      const typeSummary = document.getElementById('summary-type');
      const dateSummary = document.getElementById('summary-date');
      const timeSummary = document.getElementById('summary-time');

      if (typeSummary) {
        if (currentTypeIndex === 1) {
          typeSummary.textContent = fiestaSubtype === 'Madrina' ? 'Madrina & Gala (Fiesta)' : 'Fiesta e Invitada';
        } else {
          typeSummary.textContent = APPOINTMENT_TYPES[currentTypeIndex].fullTitle;
        }
      }

      if (dateSummary && selectedDate) {
        const dayName = DAYS_ES[selectedDate.getDay()];
        const monthName = MONTH_NAMES[selectedDate.getMonth()];
        dateSummary.textContent = `${dayName}, ${selectedDate.getDate()} de ${monthName} ${selectedDate.getFullYear()}`;
      }

      if (timeSummary) {
        timeSummary.textContent = `${selectedTime} h`;
      }
    }

    // GESTIÓN DE MENSAJES DE ERROR
    function showBookingError(message) {
      const errorEl = document.getElementById('booking-error-alert');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'flex';
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        alert(message);
      }
    }

    function hideBookingError() {
      const errorEl = document.getElementById('booking-error-alert');
      if (errorEl) {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
      }
    }

    // ENVÍO DE FORMULARIO CON LLAMADA A LA API DE CITAS
    async function handleAppointmentSubmit(event) {
      event.preventDefault();
      hideBookingError();
      
      const nameInput = document.getElementById('client-name');
      const phoneInput = document.getElementById('client-phone');
      const emailInput = document.getElementById('client-email');
      const eventDateInput = document.getElementById('client-event-date');
      const notesInput = document.getElementById('client-notes');
      const termsInput = document.getElementById('terms-check');
      const submitBtn = document.getElementById('submit-btn');

      // Validar campos obligatorios
      if (!nameInput || !nameInput.value.trim()) {
        showBookingError('Por favor, introduce tu nombre y apellidos.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phoneInput || !phoneInput.value.trim()) {
        showBookingError('Por favor, indícanos un teléfono de contacto.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!emailInput || !emailInput.value.trim() || !emailInput.checkValidity()) {
        showBookingError('Por favor, introduce una dirección de correo electrónico válida.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!termsInput || !termsInput.checked) {
        showBookingError('Debes aceptar los términos y condiciones del atelier para solicitar la cita.');
        if (termsInput) termsInput.focus();
        return;
      }

      // Preparar campos para el payload de la API
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const fechaFormatted = `${year}-${month}-${day}`;

      let tipoCitaApi = APPOINTMENT_TYPES[currentTypeIndex].title;
      if (currentTypeIndex === 0) {
        tipoCitaApi = 'Novia a medida';
      } else if (currentTypeIndex === 1) {
        tipoCitaApi = fiestaSubtype; // 'Madrina' o 'Fiesta'
      } else if (currentTypeIndex === 2) {
        tipoCitaApi = 'Comunión a medida';
      }

      const payload = {
        tipo_cita: tipoCitaApi,
        fecha: fechaFormatted,
        franja_horaria: selectedFranja,
        nombre_apellidos: nameInput.value.trim(),
        telefono_contacto: phoneInput.value.trim(),
        mail: emailInput.value.trim(),
        fecha_estimada: (eventDateInput && eventDateInput.value.trim()) ? eventDateInput.value.trim() : null,
        detalles: (notesInput && notesInput.value.trim()) ? notesInput.value.trim() : null
      };

      console.info(`[Atelier Citas] Enviando solicitud POST a: ${API_CITAS_URL}`, payload);

      // Estado visual de envío en el botón
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Tramitando cita en el Atelier...</span>';
      }

      try {
        const response = await fetch(API_CITAS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        // 201 Created o respuesta satisfactoria
        if (response.status === 201 || response.ok) {
          const result = await response.json();
          console.info('[Atelier Citas] Cita solicitada correctamente (201):', result);

          const appointment = result.data || {};
          const appointmentId = appointment.id || result.id;

          // Rellenar pantalla de confirmación con los datos devueltos
          const refCodeEl = document.getElementById('confirm-ref-code');
          if (refCodeEl) {
            refCodeEl.textContent = appointmentId ? `REF: ${appointmentId}` : `REF: MD-${currentYear}-${Math.floor(1000 + Math.random() * 9000)}`;
          }

          const resTypeEl = document.getElementById('res-type');
          if (resTypeEl) {
            if (appointment.type) {
              resTypeEl.textContent = appointment.type.toLowerCase().includes('medida')
                ? appointment.type
                : appointment.type + ' a Medida';
            } else {
              resTypeEl.textContent = APPOINTMENT_TYPES[currentTypeIndex].fullTitle;
            }
          }

          const resDateEl = document.getElementById('res-date');
          if (resDateEl) {
            const dayName = DAYS_ES[selectedDate.getDay()];
            const monthName = MONTH_NAMES[selectedDate.getMonth()];
            resDateEl.textContent = `${dayName}, ${selectedDate.getDate()} de ${monthName} de ${selectedDate.getFullYear()}`;
          }

          const resTimeEl = document.getElementById('res-time');
          if (resTimeEl) {
            resTimeEl.textContent = appointment.time_slot ? `${appointment.time_slot} (Exclusividad atelier)` : `${selectedTime} h (90 min de exclusividad)`;
          }

          const resNameEl = document.getElementById('res-name');
          if (resNameEl) {
            resNameEl.textContent = appointment.name || payload.nombre_apellidos;
          }

          const resPhoneEl = document.getElementById('res-phone');
          if (resPhoneEl) {
            resPhoneEl.textContent = appointment.phone || payload.telefono_contacto;
          }

          const resEmailEl = document.getElementById('res-email');
          if (resEmailEl) {
            resEmailEl.textContent = appointment.email || appointment.mail || payload.mail;
          }

          // Alternar vistas
          document.getElementById('appointment-form').style.display = 'none';
          const confirmScreen = document.getElementById('confirmation-screen');
          confirmScreen.style.display = 'block';

          // Scroll suave hacia la confirmación
          confirmScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          let errorMsg = 'No ha sido posible registrar la cita previa.';
          try {
            const errData = await response.json();
            if (errData && errData.message) {
              errorMsg = errData.message;
            }
          } catch (_) {}
          console.error(`[Atelier Citas] Error HTTP ${response.status}:`, errorMsg);
          showBookingError(`${errorMsg} Por favor, inténtalo de nuevo o contáctanos directamente por teléfono.`);
        }
      } catch (err) {
        console.error('[Atelier Citas] Excepción al procesar cita:', err);
        showBookingError('No pudimos conectar con el servicio de citas (' + (err.message || 'error de conexión') + '). Por favor, comprueba tu conexión o llámanos al +34 629 675 583.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }
      }
    }

    function resetBookingForm() {
      hideBookingError();
      document.getElementById('appointment-form').reset();
      document.getElementById('appointment-form').style.display = 'block';
      document.getElementById('confirmation-screen').style.display = 'none';
      selectedDate = getFirstAvailableDate();
      setAppointmentType(0);
      setFiestaSubtype('Madrina');
      const slot1Btn = document.getElementById('slot-1');
      if (slot1Btn) {
        selectTimeSlot('10:00 - 11:30', slot1Btn, 'Mañana (10:00 - 11:30)');
      }
      renderCalendar();
      updateTimeSlotsAvailability();
      updateTypeDetailContent();
      updateSummary();
      document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
    }

    function openTermsModal(e) {
      e.preventDefault();
      alert('TÉRMINOS Y CONDICIONES DEL ATELIER MARÍA DIEZMA:\n\n1. La primera cita de asesoramiento y diseño es un servicio de cortesía gratuito y sin compromiso de compra.\n2. La reserva otorga 90 minutos de exclusividad en nuestro espacio de C/ de Goya, 69, Madrid.\n3. Rogamos avisar con al menos 24 horas de antelación en caso de necesitar reprogramar la cita.\n4. Sus datos personales serán tratados exclusivamente para la gestión de su reserva conforme al RGPD.');
    }

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
    let selectedTime = '10:00 - 11:30';
    let selectedDate = new Date(2026, 8, 10); // 10 Septiembre 2026 por defecto
    let currentMonth = 8; // Septiembre (0-indexed)
    let currentYear = 2026;

    const MONTH_NAMES = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // INICIALIZACIÓN
    document.addEventListener('DOMContentLoaded', () => {
      renderCalendar();
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

      // Actualizar etiqueta pill
      const pill = document.getElementById('active-type-pill');
      if (pill) pill.textContent = APPOINTMENT_TYPES[currentTypeIndex].title;

      // Actualizar tarjeta descriptiva
      const detail = APPOINTMENT_TYPES[currentTypeIndex];
      const titleEl = document.getElementById('type-detail-title');
      const textEl = document.getElementById('type-detail-text');
      
      if (titleEl) {
        titleEl.innerHTML = `${detail.fullTitle} <span>${detail.duration}</span>`;
      }
      if (textEl) {
        textEl.textContent = detail.description;
      }

      updateSummary();
    }

    function onRangeSliderChange(val) {
      setAppointmentType(val);
    }

    // GESTIÓN DE TRAMOS HORARIOS (4 TRAMOS)
    function selectTimeSlot(slotString, btnElement) {
      selectedTime = slotString;
      
      // Quitar clase selected a los demás
      document.querySelectorAll('.time-slot-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-checked', 'false');
      });
      
      btnElement.classList.add('selected');
      btnElement.setAttribute('aria-checked', 'true');
      
      updateSummary();
    }

    // CALENDARIO MENSUAL
    function renderCalendar() {
      const label = document.getElementById('calendar-month-label');
      const grid = document.getElementById('calendar-grid');
      if (!label || !grid) return;

      label.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
      grid.innerHTML = '';

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
        const dayOfWeek = dateObj.getDay(); // 0 = Domingo
        const isSunday = dayOfWeek === 0;

        const dayBtn = document.createElement('button');
        dayBtn.type = 'button';
        dayBtn.className = 'calendar-day';
        dayBtn.textContent = day;

        const isSelected = selectedDate && 
                           selectedDate.getDate() === day && 
                           selectedDate.getMonth() === currentMonth && 
                           selectedDate.getFullYear() === currentYear;

        if (isSelected) {
          dayBtn.classList.add('selected');
        }

        if (isSunday) {
          dayBtn.classList.add('sunday');
          dayBtn.disabled = true;
          dayBtn.title = 'Domingo cerrado';
        } else {
          dayBtn.onclick = () => {
            selectedDate = dateObj;
            renderCalendar();
            updateSummary();
          };
        }

        grid.appendChild(dayBtn);
      }
    }

    function prevMonth() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    }

    function nextMonth() {
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
        typeSummary.textContent = APPOINTMENT_TYPES[currentTypeIndex].fullTitle;
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

    // ENVÍO DE FORMULARIO CON VALIDACIÓN
    function handleAppointmentSubmit(event) {
      event.preventDefault();
      
      const nameInput = document.getElementById('client-name');
      const phoneInput = document.getElementById('client-phone');
      const emailInput = document.getElementById('client-email');
      const termsInput = document.getElementById('terms-check');
      const notesInput = document.getElementById('client-notes');

      // Validar campos obligatorios
      if (!nameInput.value.trim()) {
        alert('Por favor, introduce tu nombre y apellidos.');
        nameInput.focus();
        return;
      }

      if (!phoneInput.value.trim()) {
        alert('Por favor, indícanos un teléfono de contacto.');
        phoneInput.focus();
        return;
      }

      if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        alert('Por favor, introduce una dirección de correo electrónico válida.');
        emailInput.focus();
        return;
      }

      if (!termsInput.checked) {
        alert('Debes aceptar los términos y condiciones del atelier para solicitar la cita.');
        termsInput.focus();
        return;
      }

      // Preparar pantalla de confirmación
      document.getElementById('res-type').textContent = APPOINTMENT_TYPES[currentTypeIndex].fullTitle;
      
      const dayName = DAYS_ES[selectedDate.getDay()];
      const monthName = MONTH_NAMES[selectedDate.getMonth()];
      document.getElementById('res-date').textContent = `${dayName}, ${selectedDate.getDate()} de ${monthName} de ${selectedDate.getFullYear()}`;
      document.getElementById('res-time').textContent = `${selectedTime} h (90 min de exclusividad)`;
      document.getElementById('res-name').textContent = nameInput.value.trim();
      document.getElementById('res-phone').textContent = phoneInput.value.trim();

      // Generar código aleatorio
      const randomRef = 'REF: MD-' + currentYear + '-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('confirm-ref-code').textContent = randomRef;

      // Alternar vistas
      document.getElementById('appointment-form').style.display = 'none';
      const confirmScreen = document.getElementById('confirmation-screen');
      confirmScreen.style.display = 'block';

      // Scroll suave hacia la confirmación
      confirmScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function resetBookingForm() {
      document.getElementById('appointment-form').reset();
      document.getElementById('appointment-form').style.display = 'block';
      document.getElementById('confirmation-screen').style.display = 'none';
      setAppointmentType(0);
      document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
    }

    function openTermsModal(e) {
      e.preventDefault();
      alert('TÉRMINOS Y CONDICIONES DEL ATELIER MARÍA DIEZMA:\n\n1. La primera cita de asesoramiento y diseño es un servicio de cortesía gratuito y sin compromiso de compra.\n2. La reserva otorga 90 minutos de exclusividad en nuestro espacio de C/ de Goya, 69, Madrid.\n3. Rogamos avisar con al menos 24 horas de antelación en caso de necesitar reprogramar la cita.\n4. Sus datos personales serán tratados exclusivamente para la gestión de su reserva conforme al RGPD.');
    }

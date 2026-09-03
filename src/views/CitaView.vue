<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getDressById } from '../data/dresses'

const route = useRoute()

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
]

const TIME_SLOTS = [
  { slot: '10:00 - 11:30', period: 'Mañana' },
  { slot: '12:00 - 13:30', period: 'Mediodía' },
  { slot: '16:30 - 18:00', period: 'Tarde' },
  { slot: '18:15 - 19:45', period: 'Atardecer' }
]

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

// ESTADO REACTIVO
const currentTypeIndex = ref(0)
const selectedTime = ref('10:00 - 11:30')
const selectedDate = ref(new Date(2026, 8, 10)) // Septiembre 2026
const currentMonth = ref(8)
const currentYear = ref(2026)

const currentType = computed(() => APPOINTMENT_TYPES[currentTypeIndex.value])

// Formulario
const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  eventDate: '',
  dressRef: '',
  comments: ''
})

const isSubmitted = ref(false)

onMounted(() => {
  if (route.query.vestido) {
    const dress = getDressById(route.query.vestido)
    if (dress) {
      formData.value.dressRef = `${dress.name} (${dress.ref})`
      formData.value.comments = `Interesada en el modelo ${dress.name} de la ${dress.collectionName}.`
    }
  }
  if (route.query.coleccion) {
    formData.value.comments = `Interesada en la colección: ${route.query.coleccion}.`
  }
})

// Lógica de Calendario
const daysInCurrentMonth = computed(() => {
  const days = []
  const date = new Date(currentYear.value, currentMonth.value, 1)
  
  // Primer día del mes: 0=Domingo, 1=Lunes, etc.
  let firstDayIndex = date.getDay()
  // Ajuste para que la semana empiece en Lunes (0=Lunes, 6=Domingo)
  let startingCol = (firstDayIndex === 0) ? 6 : firstDayIndex - 1

  // Días en blanco iniciales
  for (let i = 0; i < startingCol; i++) {
    days.push({ blank: true, id: `blank-${i}` })
  }

  // Días del mes
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  for (let d = 1; d <= totalDays; d++) {
    const dayDate = new Date(currentYear.value, currentMonth.value, d)
    const isSunday = dayDate.getDay() === 0
    const isSelected = selectedDate.value && 
      selectedDate.value.getDate() === d &&
      selectedDate.value.getMonth() === currentMonth.value &&
      selectedDate.value.getFullYear() === currentYear.value

    days.push({
      blank: false,
      day: d,
      date: dayDate,
      isSunday,
      isSelected,
      id: `day-${d}`
    })
  }

  return days
})

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectDay(dayObj) {
  if (dayObj.blank || dayObj.isSunday) return
  selectedDate.value = dayObj.date
}

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return 'No seleccionada'
  const dayName = DAYS_ES[selectedDate.value.getDay()]
  const dayNum = selectedDate.value.getDate()
  const monthName = MONTH_NAMES[selectedDate.value.getMonth()]
  const year = selectedDate.value.getFullYear()
  return `${dayName}, ${dayNum} de ${monthName} de ${year}`
})

function handleSubmit() {
  isSubmitted.value = true
}

function resetBooking() {
  isSubmitted.value = false
  formData.value = {
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    dressRef: '',
    comments: ''
  }
}
</script>

<template>
  <div class="cita-view">
    <!-- CABECERA DE LA PÁGINA -->
    <section class="cita-hero">
      <div class="container">
        <span class="cita-eyebrow">Atelier Privado Madrid · Barrio de Salamanca</span>
        <h1 class="cita-title">Reserva tu Cita Exclusiva</h1>
        <p class="cita-lead">
          Un espacio reservado solo para ti y tus acompañantes. Elige el tipo de cita, la fecha y la hora que mejor se adapten a tu agenda.
        </p>
      </div>
    </section>

    <!-- CUERPO DEL SISTEMA DE RESERVAS -->
    <section class="booking-section">
      <div class="container">
        <div class="booking-layout">
          
          <!-- COLUMNA PRINCIPAL DE PASOS -->
          <div class="booking-main-col">
            
            <!-- VISTA DE CONFIRMACIÓN SI YA SE ENVIÓ -->
            <div v-if="isSubmitted" class="confirmation-card">
              <div class="success-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span class="confirmation-eyebrow">¡Solicitud Recibida con Éxito!</span>
              <h2 class="confirmation-title">Te esperamos en el Atelier, {{ formData.fullName || 'Querida Novia' }}</h2>
              <p class="confirmation-text">
                Hemos bloqueado provisionalmente tu encuentro el <strong>{{ formattedSelectedDate }}</strong> a las <strong>{{ selectedTime }}</strong>. Te hemos enviado un email de confirmación a <em>{{ formData.email }}</em> con los detalles del atelier y recomendaciones para tu visita.
              </p>
              <div class="confirmation-summary-box">
                <div><strong>Tipo de Cita:</strong> {{ currentType.fullTitle }}</div>
                <div><strong>Fecha:</strong> {{ formattedSelectedDate }}</div>
                <div><strong>Horario:</strong> {{ selectedTime }} ({{ currentType.duration }})</div>
                <div v-if="formData.dressRef"><strong>Referencia:</strong> {{ formData.dressRef }}</div>
                <div><strong>Ubicación:</strong> C/ de Goya, 69 · Barrio Salamanca, Madrid</div>
              </div>
              <button class="btn-reset" @click="resetBooking">
                Realizar otra consulta o reserva
              </button>
            </div>

            <!-- FORMULARIO DE RESERVA COMPLETO -->
            <form v-else @submit.prevent="handleSubmit" class="booking-form-wrap">
              
              <!-- PASO 1: TIPO DE CITA (SLIDER INTERACTIVO) -->
              <div class="step-container">
                <div class="step-header">
                  <span class="step-badge">Paso 01</span>
                  <h3 class="step-title">Selecciona el Tipo de Cita</h3>
                </div>

                <div class="appointment-type-switcher">
                  <div class="switcher-tabs">
                    <button 
                      v-for="(type, idx) in APPOINTMENT_TYPES" 
                      :key="type.id"
                      type="button" 
                      class="type-tab-btn" 
                      :class="{ 'active': currentTypeIndex === idx }"
                      @click="currentTypeIndex = idx"
                    >
                      {{ type.title }}
                    </button>
                  </div>

                  <div class="type-detail-card">
                    <div class="type-card-top">
                      <h4 class="type-card-title">{{ currentType.fullTitle }}</h4>
                      <span class="type-duration-pill">{{ currentType.duration }}</span>
                    </div>
                    <p class="type-card-desc">{{ currentType.description }}</p>
                  </div>
                </div>
              </div>

              <!-- PASO 2: FECHA Y CALENDARIO -->
              <div class="step-container">
                <div class="step-header">
                  <span class="step-badge">Paso 02</span>
                  <h3 class="step-title">Elige la Fecha en el Atelier</h3>
                </div>

                <div class="calendar-widget">
                  <div class="calendar-nav">
                    <button type="button" class="cal-nav-btn" @click="prevMonth" aria-label="Mes anterior">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <span class="cal-month-title">
                      {{ MONTH_NAMES[currentMonth] }} {{ currentYear }}
                    </span>
                    <button type="button" class="cal-nav-btn" @click="nextMonth" aria-label="Mes siguiente">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>

                  <div class="calendar-weekdays">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                  </div>

                  <div class="calendar-days-grid">
                    <div 
                      v-for="d in daysInCurrentMonth" 
                      :key="d.id"
                      class="cal-day-cell"
                      :class="{
                        'is-blank': d.blank,
                        'is-disabled': d.isSunday,
                        'is-selected': d.isSelected
                      }"
                      @click="selectDay(d)"
                    >
                      <span v-if="!d.blank">{{ d.day }}</span>
                    </div>
                  </div>

                  <div class="calendar-legend">
                    <span>* Domingos cerrado por descanso del taller artesanal</span>
                  </div>
                </div>
              </div>

              <!-- PASO 3: FRANJA HORARIA -->
              <div class="step-container">
                <div class="step-header">
                  <span class="step-badge">Paso 03</span>
                  <h3 class="step-title">Selecciona la Franja Horaria</h3>
                </div>

                <div class="time-slots-grid">
                  <button 
                    v-for="slot in TIME_SLOTS" 
                    :key="slot.slot"
                    type="button" 
                    class="time-slot-card"
                    :class="{ 'selected': selectedTime === slot.slot }"
                    @click="selectedTime = slot.slot"
                  >
                    <span class="slot-period">{{ slot.period }}</span>
                    <span class="slot-hours">{{ slot.slot }}</span>
                  </button>
                </div>
              </div>

              <!-- PASO 4: DATOS DE CONTACTO -->
              <div class="step-container">
                <div class="step-header">
                  <span class="step-badge">Paso 04</span>
                  <h3 class="step-title">Tus Datos de Contacto</h3>
                </div>

                <div class="contact-fields-grid">
                  <div class="form-group">
                    <label for="fullName">Nombre y Apellidos *</label>
                    <input 
                      id="fullName" 
                      v-model="formData.fullName" 
                      type="text" 
                      required 
                      placeholder="Ej: Carmen Gómez"
                    >
                  </div>

                  <div class="form-group">
                    <label for="email">Correo Electrónico *</label>
                    <input 
                      id="email" 
                      v-model="formData.email" 
                      type="email" 
                      required 
                      placeholder="carmen@ejemplo.com"
                    >
                  </div>

                  <div class="form-group">
                    <label for="phone">Teléfono de Contacto *</label>
                    <input 
                      id="phone" 
                      v-model="formData.phone" 
                      type="tel" 
                      required 
                      placeholder="+34 600 000 000"
                    >
                  </div>

                  <div class="form-group">
                    <label for="eventDate">Fecha Estimada de la Boda / Evento</label>
                    <input 
                      id="eventDate" 
                      v-model="formData.eventDate" 
                      type="date"
                    >
                  </div>

                  <div class="form-group full-width">
                    <label for="dressRef">Vestido o Colección de Referencia (Opcional)</label>
                    <input 
                      id="dressRef" 
                      v-model="formData.dressRef" 
                      type="text" 
                      placeholder="Ej: Vestido Altea (REF. MD-01)"
                    >
                  </div>

                  <div class="form-group full-width">
                    <label for="comments">¿Algo que te gustaría contarnos antes de la cita?</label>
                    <textarea 
                      id="comments" 
                      v-model="formData.comments" 
                      rows="3" 
                      placeholder="Cuéntanos el estilo de tu boda, si tienes tejidos favoritos o cualquier detalle que nos ayude a preparar tu visita."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" class="btn-submit-booking">
                  <span>Confirmar Solicitud de Cita</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>

            </form>
          </div>

          <!-- COLUMNA LATERAL: RESUMEN EN TIEMPO REAL -->
          <aside class="booking-summary-col">
            <div class="summary-sticky-card">
              <h3 class="summary-title">Resumen de tu Cita</h3>
              
              <div class="summary-item">
                <span class="summary-label">Tipo de Encuentro</span>
                <span class="summary-val highlight">{{ currentType.fullTitle }}</span>
                <span class="summary-sub">{{ currentType.duration }} de atención exclusiva</span>
              </div>

              <div class="summary-item">
                <span class="summary-label">Fecha Reservada</span>
                <span class="summary-val">{{ formattedSelectedDate }}</span>
              </div>

              <div class="summary-item">
                <span class="summary-label">Tramo Horario</span>
                <span class="summary-val">{{ selectedTime }}</span>
              </div>

              <div v-if="formData.dressRef" class="summary-item">
                <span class="summary-label">Diseño Solicitado</span>
                <span class="summary-val">{{ formData.dressRef }}</span>
              </div>

              <div class="summary-atelier-info">
                <span class="summary-label">Lugar del Encuentro</span>
                <p><strong>María Diezma Atelier</strong><br>Calle de Goya, 69 · 1º Dcha<br>28001 Barrio Salamanca, Madrid</p>
              </div>

              <div class="summary-guarantee">
                <span class="icon">✓</span>
                <p>Sin compromiso alguno. Cita personalizada con prueba de tejidos y estudio de silueta.</p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cita-hero {
  padding: 5rem 0 3.5rem;
  background-color: #f6f2ee;
  border-bottom: 1px solid var(--border);
  text-align: center;
}

.cita-eyebrow {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.cita-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 400;
  color: var(--fg);
  margin-bottom: 1.25rem;
}

.cita-lead {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--muted);
  max-width: 680px;
  margin: 0 auto;
}

.booking-section {
  padding: 5rem 0 7rem;
  background-color: var(--bg);
}

.booking-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  align-items: flex-start;
}

.step-container {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.step-badge {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  background: #fbf5f2;
  border: 1px solid #eedcd3;
  padding: 0.25rem 0.6rem;
  border-radius: 2px;
  font-weight: 600;
}

.step-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--fg);
}

/* PASO 1 TABS */
.switcher-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.type-tab-btn {
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--muted);
  transition: var(--transition-base);
}

.type-tab-btn:hover {
  border-color: #c9bfb6;
  color: var(--fg);
}

.type-tab-btn.active {
  background: var(--fg);
  color: #ffffff;
  border-color: var(--fg);
}

.type-detail-card {
  background: #faf8f5;
  border-radius: 4px;
  padding: 1.5rem;
  border-left: 3px solid var(--accent);
}

.type-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.type-card-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--fg);
}

.type-duration-pill {
  font-size: 0.74rem;
  color: var(--accent);
  background: #ffffff;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  border: 1px solid #eedcd3;
  font-weight: 500;
}

.type-card-desc {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.6;
}

/* CALENDARIO */
.calendar-widget {
  background: #faf8f5;
  border-radius: 6px;
  padding: 1.75rem;
  border: 1px solid var(--border);
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.cal-nav-btn {
  padding: 0.5rem;
  border-radius: 50%;
  color: var(--fg);
  background: #ffffff;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-base);
}

.cal-nav-btn:hover {
  background: var(--fg);
  color: #ffffff;
}

.cal-month-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 500;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.calendar-days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
}

.cal-day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.92rem;
  border-radius: 4px;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid var(--border);
  transition: var(--transition-base);
}

.cal-day-cell:not(.is-blank):not(.is-disabled):hover {
  border-color: var(--accent);
  color: var(--accent);
}

.cal-day-cell.is-blank {
  background: transparent;
  border-color: transparent;
  cursor: default;
}

.cal-day-cell.is-disabled {
  background: #f0ebe5;
  color: #b8aea5;
  cursor: not-allowed;
  opacity: 0.6;
}

.cal-day-cell.is-selected {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
  font-weight: 600;
}

.calendar-legend {
  font-size: 0.76rem;
  color: var(--muted);
  font-style: italic;
  margin-top: 1rem;
}

/* HORARIOS */
.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.time-slot-card {
  padding: 1.1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: #faf8f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  transition: var(--transition-base);
}

.time-slot-card:hover {
  border-color: #c9bfb6;
}

.time-slot-card.selected {
  border-color: var(--accent);
  background: #fbf5f2;
}

.slot-period {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.time-slot-card.selected .slot-period {
  color: var(--accent);
}

.slot-hours {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--fg);
}

/* FORMULARIO */
.contact-fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: var(--fg);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.92rem;
  background: #faf8f5;
  transition: var(--transition-base);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(158, 75, 55, 0.12);
}

.btn-submit-booking {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--accent);
  color: #ffffff;
  padding: 1.15rem 2rem;
  font-size: 0.92rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 500;
  border-radius: 2px;
  transition: var(--transition-base);
}

.btn-submit-booking:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(158, 75, 55, 0.35);
}

/* RESUMEN LATERAL */
.summary-sticky-card {
  position: sticky;
  top: 100px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 2.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.summary-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--border);
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}

.summary-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  font-weight: 600;
}

.summary-val {
  font-size: 0.98rem;
  color: var(--fg);
  font-weight: 500;
}

.summary-val.highlight {
  color: var(--accent);
}

.summary-sub {
  font-size: 0.78rem;
  color: var(--muted);
}

.summary-atelier-info {
  background: #faf8f5;
  border-radius: 4px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  border-left: 2px solid var(--accent);
}

.summary-atelier-info p {
  font-size: 0.84rem;
  color: var(--muted);
  line-height: 1.5;
  margin-top: 0.35rem;
}

.summary-atelier-info strong {
  color: var(--fg);
}

.summary-guarantee {
  display: flex;
  gap: 0.65rem;
  font-size: 0.78rem;
  color: var(--muted);
  line-height: 1.45;
}

.summary-guarantee .icon {
  color: #2b7a4b;
  font-weight: bold;
}

/* CONFIRMACIÓN CARD */
.confirmation-card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.success-icon-wrap {
  width: 72px;
  height: 72px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: #f0f7f3;
  color: #2b7a4b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirmation-eyebrow {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.confirmation-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.confirmation-text {
  font-size: 0.98rem;
  color: var(--muted);
  line-height: 1.75;
  max-width: 580px;
  margin: 0 auto 2rem;
}

.confirmation-summary-box {
  background: #faf8f5;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1.5rem 2rem;
  text-align: left;
  max-width: 480px;
  margin: 0 auto 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--muted);
}

.confirmation-summary-box strong {
  color: var(--fg);
}

.btn-reset {
  display: inline-block;
  border: 1px solid var(--fg);
  padding: 0.85rem 1.8rem;
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--fg);
  transition: var(--transition-base);
}

.btn-reset:hover {
  background: var(--fg);
  color: #ffffff;
}

@media (max-width: 960px) {
  .booking-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .contact-fields-grid {
    grid-template-columns: 1fr;
  }
  .form-group.full-width {
    grid-column: span 1;
  }
}

@media (max-width: 550px) {
  .switcher-tabs {
    grid-template-columns: 1fr;
  }
  .time-slots-grid {
    grid-template-columns: 1fr;
  }
  .step-container {
    padding: 1.75rem 1.25rem;
  }
}
</style>

<script setup>
import FaqAccordion from '../components/FaqAccordion.vue'

const steps = [
  {
    num: '01',
    phase: 'Paso 01 · Capturando tu Visión',
    timing: 'Consulta Inicial',
    title: '1. Consulta Inicial: Capturando tu Visión',
    desc: 'El viaje comienza con una consulta personalizada en nuestro acogedor estudio. Durante esta sesión, nos tomamos el tiempo para conocerte, comprender tus gustos y explorar tus ideas y deseos. Hablaremos sobre los estilos que te inspiran, las telas que amas y cualquier detalle especial que desees incorporar. Nuestro objetivo es capturar la esencia de lo que deseas y transformarla en un diseño único.',
    highlights: [
      { label: 'Encuentro íntimo:', text: 'Dedicamos todo el tiempo necesario a conocerte y explorar tus deseos.' },
      { label: 'Esencia a medida:', text: 'Definimos estilos de inspiración y las telas que amas para crear una pieza única.' }
    ],
    image: '/assets/images/atelier/MariaDiezmaAtelier0.jpg',
    caption: 'Consulta personalizada en nuestro estudio',
    inverted: false
  },
  {
    num: '02',
    phase: 'Paso 02 · Dando Forma a tus Sueños',
    timing: 'Bocetos y Diseño',
    title: '2. Bocetos y Diseño: Dando Forma a tus Sueños',
    desc: 'Basándonos en nuestra conversación inicial, comenzamos a esbozar varios diseños que podrían encajar con tu visión. Utilizando técnicas tradicionales, creamos bocetos detallados y seleccionamos una paleta de materiales de alta calidad. Nos aseguramos de que cada diseño tenga en cuenta tu figura, estilo y los elementos que hacen que tu vestido sea único. Discutimos estos bocetos contigo, ajustando y perfeccionando hasta que encontramos el diseño perfecto.',
    highlights: [
      { label: 'Técnicas tradicionales:', text: 'Bocetos ilustrados al detalle adaptados a tu figura y estilo.' },
      { label: 'Ajuste y perfección:', text: 'Dialogamos y pulimos juntos cada boceto hasta dar con el diseño perfecto.' }
    ],
    image: '/assets/images/atelier/MariaDiezmaAtelier1.jpg',
    caption: 'Bocetos y técnicas tradicionales de diseño',
    inverted: true
  },
  {
    num: '03',
    phase: 'Paso 03 · La Elegancia en Cada Puntada',
    timing: 'Selección de Telas y Detalles',
    title: '3. Selección de Telas y Detalles: La Elegancia en Cada Puntada',
    desc: 'La elección de las telas es un paso crucial en nuestro proceso. Trabajamos con una amplia gama de materiales exquisitos, desde encajes delicados y sedas lujosas hasta tules etéreos y organzas brillantes. Te invitamos a tocar y ver las telas, asegurándote de que te enamores de cada elemento de tu vestido. También seleccionamos los detalles finales, como bordados, pedrería y apliques, que añadirán ese toque especial y personalizado.',
    highlights: [
      { label: 'Telas exquisitas:', text: 'Encajes delicados, sedas lujosas, tules etéreos y organzas brillantes.' },
      { label: 'Detalles finales:', text: 'Selección a medida de bordados, pedrería y apliques exclusivos.' }
    ],
    image: '/assets/images/atelier/MariaDiezmaAtelier2.jpg',
    caption: 'Tocar, ver y enamorarse de cada tela',
    inverted: false
  },
  {
    num: '04',
    phase: 'Paso 04 · Perfeccionando Cada Detalle',
    timing: 'Creación y Pruebas',
    title: '4. Creación y Pruebas: Perfeccionando Cada Detalle',
    desc: 'Una vez que se aprueba el diseño y se seleccionan las telas, comenzamos a dar vida a tu vestido. A lo largo de varias pruebas, ajustamos y refinamos el vestido para asegurar un ajuste perfecto. Estas pruebas son una oportunidad para ver cómo tu vestido evoluciona y para hacer cualquier ajuste necesario para que te sientas cómoda y segura el día de tu boda.',
    highlights: [
      { label: 'Evolución viva:', text: 'Siente la emoción de ver tu vestido materializarse paso a paso.' },
      { label: 'Ajuste perfecto:', text: 'Adaptación anatómica completa para que te sientas cómoda y segura.' }
    ],
    image: '/assets/images/atelier/MariaDiezmaAtelier4.jpg',
    caption: 'Refinamiento y ajuste milimétrico',
    inverted: true
  },
  {
    num: '05',
    phase: 'Paso 05 · Preparada para tu Gran Día',
    timing: 'Toques Finales y Entrega',
    title: '5. Toques Finales y Entrega: Preparada para tu Gran Día',
    desc: 'Después de las pruebas finales y de asegurarnos de que cada detalle esté impecable, realizamos los toques finales. Planchar, embellecer y preparar el vestido para su gran debut es un proceso que hacemos con la máxima atención y cuidado. Finalmente, te entregamos tu vestido envuelto en amor y listo para ser usado en uno de los días más importantes de tu vida.',
    highlights: [
      { label: 'Máximo cuidado:', text: 'Planchado a mano, embellecimiento y preparación para su gran debut.' },
      { label: 'Entrega con amor:', text: 'Tu vestido listo e impecable para uno de los días más importantes de tu vida.' }
    ],
    image: '/assets/images/atelier/MariaDiezmaAtelier5.jpg',
    caption: 'Toques finales y entrega en el atelier',
    inverted: false
  },
  {
    num: '06',
    phase: 'Paso 06 · Brilla con Luz Propia',
    timing: 'Día de la Boda',
    title: '6. Día de la Boda: Brilla con Luz Propia',
    desc: 'Nos sentimos honrados de ser parte de tu día especial y ver cómo nuestro trabajo cobra vida cuando caminas hacia el altar. Cada sonrisa, cada mirada de admiración y cada momento de felicidad en tu vestido de novia es el mayor premio para nosotros.',
    highlights: [
      { label: 'Tu momento mágico:', text: 'Ver cómo nuestro trabajo cobra vida cuando caminas hacia el altar.' },
      { label: 'El mayor premio:', text: 'Cada sonrisa, mirada de admiración y momento de felicidad en tu vestido.' }
    ],
    image: '/assets/images/atelier/MariaDiezmaAtelier6.jpg',
    caption: 'Brilla con luz propia camino al altar',
    inverted: true
  }
]

const faqs = [
  {
    question: '¿Con cuánta antelación debo pedir mi primera cita?',
    answer: 'Recomendamos iniciar el proceso entre 4 y 6 meses antes de la fecha de la boda. De este modo disponemos del tiempo necesario para la conceptualización de bocetos, selección de telas nobles y las pruebas personalizadas sin prisas.'
  },
  {
    question: '¿A cuántas personas puedo traer conmigo a las pruebas?',
    answer: 'En el atelier de María Diezma recomendamos asistir acompañada de 1 o 2 personas de tu máxima confianza. Un ambiente íntimo y acogedor favorece la concentración en los detalles y la toma de decisiones serena.'
  },
  {
    question: '¿Qué debo llevar a las pruebas del vestido?',
    answer: 'Es ideal traer la ropa interior que tengas previsto llevar el día de la boda (o similar en sujeción y tono nude) y los zapatos o unos de altura equivalente para ajustar la caída y el largo de la falda con total precisión.'
  },
  {
    question: '¿Puedo incorporar detalles o telas familiares a mi vestido?',
    answer: 'Por supuesto. En la consulta inicial y en la selección de telas podemos integrar encajes heredados, bordados con valor sentimental o cualquier detalle especial que desees que forme parte de tu diseño único.'
  }
]
</script>

<template>
  <div class="proceso-view">
    <!-- HERO DE PROCESO -->
    <section class="process-hero">
      <div class="container">
        <span class="process-eyebrow">Alta Costura a Medida · Confección Exclusiva</span>
        <h1 class="process-title">Nuestro proceso: El Arte de Crear Tu Vestido de Novia Perfecto</h1>
        <p class="process-lead">
          En nuestro atelier, cada vestido de novia es una obra maestra única, creada con amor y atención meticulosa a cada detalle. Nuestro proceso de creación se caracteriza por la colaboración cercana con la novia, garantizando que su vestido no solo refleje su estilo personal, sino que también haga realidad sus sueños más preciados.
        </p>
      </div>
    </section>

    <!-- FASES DETALLADAS -->
    <section class="process-steps-section">
      <div class="container">
        <div class="steps-timeline">
          <article 
            v-for="step in steps" 
            :key="step.num" 
            class="step-card" 
            :class="{ 'is-inverted': step.inverted }"
          >
            <div class="step-marker">{{ step.num }}</div>
            
            <div class="step-content">
              <div class="step-kicker-row">
                <span class="step-phase-badge">{{ step.phase }}</span>
                <span class="step-timing-badge">{{ step.timing }}</span>
              </div>
              <h2 class="step-heading">{{ step.title }}</h2>
              <p class="step-desc">{{ step.desc }}</p>

              <ul class="step-highlights">
                <li v-for="(h, hIdx) in step.highlights" :key="hIdx">
                  <span class="icon">✦</span>
                  <span><strong>{{ h.label }}</strong> {{ h.text }}</span>
                </li>
              </ul>
            </div>

            <div class="step-media">
              <div class="step-img-frame">
                <img :src="step.image" :alt="step.title">
                <div class="step-img-caption">
                  <span>{{ step.caption }}</span>
                  <span>María Diezma</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- PREGUNTAS FRECUENTES -->
    <section class="process-faq-section">
      <div class="container">
        <div class="faq-header">
          <span class="faq-eyebrow">Dudas Habituales</span>
          <h2 class="faq-title">Preguntas Frecuentes sobre el Proceso</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- BANNER CTA -->
    <section class="process-cta-section">
      <div class="container">
        <div class="cta-banner-card">
          <span class="cta-eyebrow">Tu Vestido de Ensueño</span>
          <h2 class="cta-title">Crear tu vestido de novia es un viaje de amor, creatividad y precisión</h2>
          <p class="cta-desc">
            Estamos aquí para hacer realidad tu visión y asegurarnos de que te sientas absolutamente radiante en tu día especial. Gracias por confiar en nosotros para crear el vestido de tus sueños.
          </p>
          <div class="cta-actions">
            <router-link to="/cita" class="btn-primary-large">
              Pedir Cita en el Atelier
            </router-link>
            <router-link to="/colecciones" class="btn-secondary-large">
              Explorar Colecciones
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.process-hero {
  padding: 5rem 0 3.5rem;
  background-color: #f6f2ee;
  border-bottom: 1px solid var(--border);
  text-align: center;
}

.process-eyebrow {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.process-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 400;
  color: var(--fg);
  margin-bottom: 1.25rem;
}

.process-lead {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--muted);
  max-width: 680px;
  margin: 0 auto;
}

.process-steps-section {
  padding: 6rem 0;
  background-color: var(--bg);
}

.steps-timeline {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.step-card {
  display: grid;
  grid-template-columns: 80px 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.step-card.is-inverted {
  grid-template-columns: 80px 1fr 1.2fr;
}

.step-card.is-inverted .step-content {
  order: 2;
}

.step-card.is-inverted .step-media {
  order: 1;
}

.step-marker {
  font-family: var(--font-brand);
  font-size: 2.75rem;
  color: #eedcd3;
  font-weight: 600;
  line-height: 1;
}

.step-kicker-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.step-phase-badge {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-weight: 600;
}

.step-timing-badge {
  font-size: 0.72rem;
  color: var(--muted);
  background: #f4ede7;
  padding: 0.15rem 0.6rem;
  border-radius: 2px;
}

.step-heading {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.step-desc {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.step-highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.step-highlights li {
  display: flex;
  gap: 0.65rem;
  font-size: 0.88rem;
  color: var(--fg);
}

.step-highlights .icon {
  color: var(--accent);
  font-size: 0.8rem;
}

.step-img-frame {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 4px;
  overflow: hidden;
}

.step-img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.step-img-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(44, 37, 35, 0.75);
  backdrop-filter: blur(4px);
  color: #ffffff;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;
}

/* FAQ */
.process-faq-section {
  padding: 6rem 0;
  background-color: #ffffff;
  border-top: 1px solid var(--border);
}

.faq-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.faq-eyebrow {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.faq-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 400;
}

/* CTA */
.process-cta-section {
  padding: 5rem 0 6rem;
  background-color: var(--bg);
}

.cta-banner-card {
  background: #25201e;
  color: #ffffff;
  border-radius: 6px;
  padding: 4rem 3rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.cta-eyebrow {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: #eedcd3;
  display: block;
  margin-bottom: 0.75rem;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 400;
  margin-bottom: 1.25rem;
}

.cta-desc {
  font-size: 0.98rem;
  line-height: 1.7;
  color: #c4b9b2;
  max-width: 620px;
  margin: 0 auto 2.5rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.btn-primary-large {
  background-color: var(--accent);
  color: #ffffff;
  padding: 0.95rem 2.2rem;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 500;
  border-radius: 2px;
  transition: var(--transition-base);
}

.btn-primary-large:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-secondary-large {
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 0.95rem 2.2rem;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  border-radius: 2px;
  transition: var(--transition-base);
}

.btn-secondary-large:hover {
  border-color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 900px) {
  .step-card,
  .step-card.is-inverted {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2.25rem;
  }
  .step-card.is-inverted .step-content {
    order: 1;
  }
  .step-card.is-inverted .step-media {
    order: 2;
  }
}
</style>

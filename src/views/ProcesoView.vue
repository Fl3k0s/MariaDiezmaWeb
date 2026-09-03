<script setup>
import FaqAccordion from '../components/FaqAccordion.vue'

const steps = [
  {
    num: '01',
    phase: 'Fase 01 · Concepción',
    timing: 'Mes 1 · Primer Encuentro',
    title: 'Primera Cita & Boceto Exclusivo',
    desc: 'Un encuentro sosegado en nuestro atelier madrileño para dialogar sobre tu visión, el estilo de la celebración y tus referencias. Probamos diferentes siluetas y definimos sobre el papel el boceto que guiará la creación.',
    highlights: [
      { label: 'Diálogo personal:', text: 'Conocemos tu estilo de vida, comodidad y aspiraciones estéticas.' },
      { label: 'Muestrario noble:', text: 'Contacto directo con crepés, mikados, encajes franceses y gasas de seda.' }
    ],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=80',
    caption: 'Boceto a mano en el atelier',
    inverted: false
  },
  {
    num: '02',
    phase: 'Fase 02 · Geometría & Anatomía',
    timing: 'Mes 2 · Precisión Milimétrica',
    title: 'Toma de Medidas & Patronaje Artesano',
    desc: 'Tomamos más de 30 medidas anatómicas de tu cuerpo para construir un patrón único e irrepetible desde cero. No trabajamos sobre tallas preexistentes; cada trazo responde exactamente a tus proporciones.',
    highlights: [
      { label: 'Patrón a medida:', text: 'Desarrollo en papel kraft exclusivo para tu anatomía.' },
      { label: 'Estudio postural:', text: 'Análisis de caída de hombros, cintura y pisada.' }
    ],
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80',
    caption: 'Toma de medidas anatómicas',
    inverted: true
  },
  {
    num: '03',
    phase: 'Fase 03 · Escultura Textil',
    timing: 'Mes 3 · Primera Prueba',
    title: 'La Glaseilla: Primera Prueba en Toile',
    desc: 'Confeccionamos un prototipo exacto de tu vestido en lienzo de algodón crudo (toile o glaseilla). En esta prueba esculpimos directamente sobre ti las líneas de escote, sisas, entalle y volumen de la falda sin temor a equivocar la seda.',
    highlights: [
      { label: 'Prototipo en lienzo:', text: 'Permite cortar, alfilerear y modificar volúmenes en vivo.' },
      { label: 'Seguridad absoluta:', text: 'Visualizas el vestido sobre tu cuerpo antes de tocar el tejido definitivo.' }
    ],
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
    caption: 'Modelado en toile de algodón',
    inverted: false
  },
  {
    num: '04',
    phase: 'Fase 04 · Materialización',
    timing: 'Mes 4-5 · Confección Real',
    title: 'Confección en Tejido Real & Pruebas de Caída',
    desc: 'Trasladamos el patrón perfeccionado a las sedas definitivas. Realizamos pruebas con tu calzado de boda para graduar el largo milimétrico, el movimiento de la cola y la colocación de bordados o botones forrados artesanalmente.',
    highlights: [
      { label: 'Prueba en movimiento:', text: 'Verificamos el ritmo de paso, soltura de brazos y vuelo de la falda.' },
      { label: 'Bordados a bastidor:', text: 'Aplicación milimétrica de encajes y micro-pedrería.' }
    ],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    caption: 'Prueba de caída en seda natural',
    inverted: true
  },
  {
    num: '05',
    phase: 'Fase 05 · Culminación',
    timing: 'Semana previa · Entrega Final',
    title: 'Últimos Detalles, Planchado & Entrega',
    desc: 'El vestido terminado recibe un planchado tradicional sobre maniquí para fijar costuras y caídas. Te lo entregamos en funda transpirable de alta costura, acompañado de las indicaciones necesarias para que luzca perfecto el gran día.',
    highlights: [
      { label: 'Planchado tradicional:', text: 'Sellado a vapor artesanal de cada costura interna.' },
      { label: 'Entrega sosegada:', text: 'Instrucciones para abotonar y cuidar el tejido en tu día.' }
    ],
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    caption: 'Vestido finalizado y entrega en atelier',
    inverted: false
  }
]

const faqs = [
  {
    question: '¿Con cuánta antelación debo pedir mi primera cita?',
    answer: 'Recomendamos iniciar el proceso entre 5 y 7 meses antes de la fecha de la boda. De este modo disponemos del tiempo necesario para las pruebas de glaseilla, tinturas especiales y bordados a mano sin urgencias.'
  },
  {
    question: '¿A cuántas personas puedo traer conmigo a las pruebas?',
    answer: 'En el atelier de María Diezma recomendamos asistir acompañada de un máximo de 2 personas de tu máxima confianza. Un ambiente íntimo favorece la concentración en los detalles y la toma de decisiones serena.'
  },
  {
    question: '¿Qué debo llevar a la prueba de la glaseilla (toile)?',
    answer: 'Para la glaseilla es ideal traer la ropa interior que tengas previsto llevar el día de la boda (o similar en sujeción y tono nude) y, si ya dispones de ellos, los zapatos o unos de altura equivalente.'
  },
  {
    question: '¿Puedo modificar el diseño una vez comenzado el vestido?',
    answer: 'La fase de glaseilla existe precisamente para explorar y pulir detalles: escotes, volúmenes de falda y larguras. Una vez cortado el tejido definitivo, se realizan ajustes anatómicos de precisión.'
  }
]
</script>

<template>
  <div class="proceso-view">
    <!-- HERO DE PROCESO -->
    <section class="process-hero">
      <div class="container">
        <span class="process-eyebrow">Costura Lenta & Sastrería Nupcial</span>
        <h1 class="process-title">El Arte de Crear un Vestido a Medida</h1>
        <p class="process-lead">
          Desde la primera idea esbozada en papel hasta el último botón forrado a mano. Así es la experiencia de crear tu vestido en el atelier de María Diezma.
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
          <span class="cta-eyebrow">Primer Paso</span>
          <h2 class="cta-title">Comienza a Crear tu Vestido en Nuestro Atelier</h2>
          <p class="cta-desc">
            Te esperamos en nuestro espacio de Madrid para escucharte, compartir ideas y diseñar juntos el boceto exclusivo de tu boda.
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

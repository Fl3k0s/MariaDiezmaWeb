<script setup>
</script>

<template>
  <div class="conoceme-view">
    <!-- CABECERA DE LA PÁGINA -->
    <section class="page-hero">
      <div class="container">
        <span class="page-eyebrow">La diseñadora y el alma del atelier</span>
        <h1 class="page-title">Conóceme</h1>
        <p class="page-quote">
          «Cada vestido es una conversación pausada entre la esencia de la novia y la pureza del corte artesanal.»
        </p>
      </div>
    </section>

    <!-- SECCIÓN PERFIL & BIOGRAFÍA -->
    <section class="designer-bio-section">
      <div class="container designer-grid">
        
        <!-- FOTO DE LA DISEÑADORA -->
        <div class="designer-media-col">
          <div class="designer-image-frame">
            <div class="designer-img-wrap">
              <img 
                src="/assets/images/romance/MARIA_DIEZMA_077.jpg" 
                alt="María Diezma trabajando en el patronaje en su atelier de Madrid" 
                class="designer-img"
              >
              <div class="designer-badge-tag">
                <span>María Diezma · Fundadora</span>
              </div>
            </div>
            <div class="designer-caption">
              <span>Atelier C/ Goya, 69 · Madrid</span>
              <span>Confección a mano</span>
            </div>
          </div>
        </div>

        <!-- CONTENIDO EDITORIAL -->
        <div class="designer-content-col">
          <span class="eyebrow">Trayectoria y Filosofía</span>
          
          <h2 class="intro-lead">
            Artesanía pausada, devoción por los tejidos nobles y un profundo respeto por la figura femenina.
          </h2>

          <div class="bio-paragraphs">
            <p>
              Tras más de una década dedicada al patronaje de alta costura y el bordado tradicional, fundé este atelier con un propósito honesto: alejar a la novia de la producción masiva para devolverle el valor a la costura pausada, íntima y rigurosamente personalizada.
            </p>
            <p>
              Aquí no existen dos vestidos iguales porque no hay dos mujeres idénticas. Escucho tus ideas, estudio tus proporciones y dibujamos juntas un boceto inicial en gasa y lino hasta hallar esa armonía perfecta que te hace sentir tú misma, bella e inolvidable en tu día.
            </p>
          </div>

          <blockquote class="pull-quote">
            <p class="quote-text">
              «Un vestido a medida no solo viste un cuerpo: abriga la emoción de uno de los días más significativos de tu vida.»
            </p>
            <div class="quote-author">María Diezma</div>
          </blockquote>

          <div class="bio-paragraphs">
            <p>
              En nuestro atelier del Barrio de Salamanca trabajamos exclusivamente mediante cita previa para dedicarte todo el tiempo y sosiego que mereces, rodeada de sedas naturales, linos rústicos y encajes de las más prestigiosas hilaturas europeas.
            </p>
          </div>

          <!-- PILARES -->
          <div class="craft-pillars">
            <div class="pillar-card">
              <div class="pillar-num">01 / ARTESANÍA</div>
              <h3 class="pillar-title">Corte a mano</h3>
              <p class="pillar-desc">Patronaje individual y modelado anatómico milimétrico sobre tu propia silueta.</p>
            </div>
            <div class="pillar-card">
              <div class="pillar-num">02 / TEJIDOS</div>
              <h3 class="pillar-title">Fibras Puras</h3>
              <p class="pillar-desc">Seda natural, crepé georgette y tules bordados de hilaturas artesanales europeas.</p>
            </div>
            <div class="pillar-card">
              <div class="pillar-num">03 / ATELIER</div>
              <h3 class="pillar-title">Cita exclusiva</h3>
              <p class="pillar-desc">Encuentros privados e individuales en nuestro espacio de Calle de Goya en Madrid.</p>
            </div>
          </div>

          <div class="action-row">
            <router-link to="/cita" class="btn-primary">
              Pedir Cita con María
            </router-link>
            <router-link to="/proceso" class="btn-secondary">
              <span>Descubrir Nuestro Proceso</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>

        </div>

      </div>
    </section>



  </div>
</template>

<style scoped>
.page-hero {
  padding: 4.5rem 0 3.5rem;
  background-color: #f6f2ee;
  border-bottom: 1px solid var(--border);
  text-align: center;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.breadcrumb a:hover {
  color: var(--accent);
}

.breadcrumb .current {
  color: var(--accent);
  font-weight: 600;
}

.page-eyebrow {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.2vw, 3.4rem);
  font-weight: 400;
  color: var(--fg);
  margin-bottom: 1.25rem;
}

.page-quote {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--muted);
  max-width: 640px;
  margin: 0 auto;
}

.designer-bio-section {
  padding: 6rem 0;
  background-color: var(--bg);
}

.designer-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4.5rem;
  align-items: flex-start;
}

.designer-image-frame {
  position: sticky;
  top: 100px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);
}

.designer-img-wrap {
  position: relative;
  aspect-ratio: 4 / 5;
}

.designer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.designer-badge-tag {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(6px);
  padding: 0.4rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--fg);
}

.designer-caption {
  padding: 0.85rem 1.25rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--muted);
  border-top: 1px solid var(--border);
}

.eyebrow {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.intro-lead {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.35;
  color: var(--fg);
  margin-bottom: 1.75rem;
}

.bio-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: 0.96rem;
  line-height: 1.8;
  color: var(--muted);
}

.pull-quote {
  margin: 2.25rem 0;
  padding: 1.5rem 2rem;
  background: #ffffff;
  border-left: 3px solid var(--accent);
  border-radius: 0 4px 4px 0;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
}

.quote-text {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--fg);
  margin-bottom: 0.5rem;
}

.quote-author {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}

.craft-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin: 2.5rem 0;
}

.pillar-card {
  background: #ffffff;
  border: 1px solid var(--border);
  padding: 1.5rem 1.2rem;
  border-radius: 4px;
}

.pillar-num {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.pillar-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.pillar-desc {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.5;
}

.action-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  background-color: var(--accent);
  color: #ffffff;
  padding: 0.95rem 2rem;
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 500;
  border-radius: 2px;
  transition: var(--transition-base);
}

.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--fg);
  font-weight: 600;
}

.btn-secondary:hover {
  color: var(--accent);
}

/* ATELIER SPACE */
.atelier-space-section {
  padding: 6rem 0;
  background: #ffffff;
  border-top: 1px solid var(--border);
}

.section-head {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 3.5rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 400;
}

.gallery-triad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.gallery-item {
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg);
}

.gallery-img-box {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.gallery-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-item:hover .gallery-img-box img {
  transform: scale(1.04);
}

.gallery-caption-box {
  padding: 1.5rem;
}

.gallery-caption-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.gallery-caption-meta {
  font-size: 0.84rem;
  color: var(--muted);
  line-height: 1.5;
}

/* CTA */
.cta-banner {
  padding: 6rem 0;
  background-color: var(--bg);
}

.cta-content {
  text-align: center;
  max-width: 700px;
}

.eyebrow-accent {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--accent);
  font-weight: 600;
  display: block;
  margin-bottom: 0.75rem;
}

.cta-banner-title {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 400;
  margin-bottom: 1.25rem;
}

.cta-text {
  font-size: 1rem;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 2.25rem;
}

@media (max-width: 900px) {
  .designer-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .craft-pillars {
    grid-template-columns: 1fr;
  }
  .gallery-triad {
    grid-template-columns: 1fr;
  }
}
</style>

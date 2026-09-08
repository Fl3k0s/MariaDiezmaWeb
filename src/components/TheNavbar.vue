<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const logoError = ref(false)

function toggleMobileNav() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileNav() {
  isMobileMenuOpen.value = false
}

watch(() => route.path, () => {
  closeMobileNav()
})
</script>

<template>
  <header class="site-header" data-od-id="header-nav">
    <div class="container header-inner">
      <router-link to="/" class="brand-logo-wrap" title="María Diezma - Vestidos de Novia a Medida">
        <img 
          v-if="!logoError"
          src="/assets/images/logo-maria-diezma.png" 
          alt="María Diezma Atelier" 
          class="brand-logo-img"
          @error="logoError = true"
        >
        <div v-else class="brand-fallback">
          MARÍA DIEZMA
          <span>ATELIER NUPCIAL · MADRID</span>
        </div>
      </router-link>

      <!-- Menú principal del Atelier -->
      <nav class="site-nav" :class="{ 'is-mobile-open': isMobileMenuOpen }" aria-label="Navegación principal">
        <router-link to="/conoceme" class="nav-link" active-class="active" data-od-id="nav-link-conoceme">
          Conóceme
        </router-link>
        <router-link to="/colecciones" class="nav-link" active-class="active" data-od-id="nav-link-colecciones">
          Colecciones
        </router-link>
        <router-link to="/proceso" class="nav-link" active-class="active" data-od-id="nav-link-proceso">
          Nuestro Proceso
        </router-link>
        <router-link to="/prensa" class="nav-link" active-class="active" data-od-id="nav-link-prensa">
          Prensa
        </router-link>
        <router-link to="/cita" class="nav-link nav-link-cta" active-class="active" data-od-id="nav-link-cita">
          Pedir Cita
        </router-link>
      </nav>

      <button 
        class="mobile-menu-btn" 
        :aria-expanded="isMobileMenuOpen" 
        aria-label="Abrir menú" 
        @click="toggleMobileNav"
      >
        <svg v-if="!isMobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  transition: var(--transition-base);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}

.brand-logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo-img {
  height: 44px;
  width: auto;
  object-fit: contain;
}

.brand-fallback {
  font-family: var(--font-brand);
  font-size: 1.25rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--fg);
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-fallback span {
  font-family: var(--font-body);
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  color: var(--muted);
  margin-top: 2px;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 400;
  color: var(--fg);
  position: relative;
  padding: 0.35rem 0;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  line-height: 1;
  transition: var(--transition-base);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background-color: var(--accent);
  transition: width 0.25s ease;
}

.nav-link:hover {
  color: var(--accent);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  color: var(--accent);
  font-weight: 500;
}

.nav-link-cta {
  padding: 0.55rem 1.2rem;
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 2px;
  transition: var(--transition-base);
}

.nav-link-cta::after {
  display: none;
}

.nav-link-cta:hover,
.nav-link-cta.active {
  background-color: var(--accent);
  color: #ffffff;
}

.mobile-menu-btn {
  display: none;
  padding: 0.5rem;
  color: var(--fg);
}

@media (max-width: 1120px) {
  .site-nav {
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 0.82rem;
    letter-spacing: 0.08em;
  }

  .nav-link-cta {
    padding: 0.45rem 0.95rem;
  }
}

@media (max-width: 980px) {
  .site-nav {
    gap: 1.1rem;
  }

  .nav-link {
    font-size: 0.78rem;
    letter-spacing: 0.05em;
  }

  .nav-link-cta {
    padding: 0.4rem 0.85rem;
  }
}

@media (max-width: 868px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .site-nav {
    display: none;
    position: absolute;
    top: 76px;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    flex-direction: column;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
    align-items: center;
    border-bottom: 1px solid var(--border);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  }

  .site-nav.is-mobile-open {
    display: flex;
  }

  .nav-link-cta {
    text-align: center;
    width: 100%;
  }
}
</style>

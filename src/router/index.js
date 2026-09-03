import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'María Diezma · Vestidos de Novia a Medida | Atelier Madrid' }
  },
  {
    path: '/conoceme',
    name: 'conoceme',
    component: () => import('../views/ConocemeView.vue'),
    meta: { title: 'Conóceme · María Diezma Atelier Madrid' }
  },
  {
    path: '/colecciones',
    name: 'colecciones',
    component: () => import('../views/ColeccionesView.vue'),
    meta: { title: 'Colecciones de Alta Costura Nupcial · María Diezma' }
  },
  {
    path: '/vestido/:id',
    name: 'detalle-vestido',
    component: () => import('../views/DetalleView.vue'),
    meta: { title: 'Detalle de Vestido · María Diezma' }
  },
  {
    path: '/proceso',
    name: 'proceso',
    component: () => import('../views/ProcesoView.vue'),
    meta: { title: 'Nuestro Proceso Artesanal · María Diezma' }
  },
  {
    path: '/cita',
    name: 'cita',
    component: () => import('../views/CitaView.vue'),
    meta: { title: 'Pedir Cita en el Atelier · María Diezma Madrid' }
  },
  {
    path: '/prensa',
    name: 'prensa',
    component: () => import('../views/PrensaView.vue'),
    meta: { title: 'Prensa · María Diezma · Vestidos de Novia a Medida' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router

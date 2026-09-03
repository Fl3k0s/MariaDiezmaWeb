/**
 * Configuración centralizada de variables de entorno (Vite / Vue 3)
 */
export const BACKOFFICE_URI = import.meta.env.VITE_BACKOFFICE_URI || 'http://localhost:8080/api'
export const APP_ENV = import.meta.env.VITE_ENV || 'development'
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || 'María Diezma Atelier'

// Log informativo al iniciar en modo desarrollo
if (import.meta.env.DEV) {
  console.info(`[Atelier Environment] Modo: ${APP_ENV} | Backoffice URI: ${BACKOFFICE_URI}`)
}

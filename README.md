# María Diezma Atelier · Web Oficial

Sitio web oficial y catálogo interactivo de **María Diezma Atelier**, firma de alta costura nupcial y vestidos a medida en Madrid. Desarrollado como una Single Page Application (SPA) moderna, elegante y de alto rendimiento.

---

## ✨ Características

- **Catálogo de Colecciones & Vestidos**: Exploración de piezas exclusivas de novia, fiesta y comunión con filtrado y vistas en detalle (`DetalleView.vue`).
- **Sistema de Reserva de Cita Previa**:
  - Selector de tipología (Novia, Fiesta, Comunión).
  - Calendario interactivo mensual con cálculo dinámico de días hábiles.
  - Selección de turnos de mañana y tarde.
  - Vinculación inteligente de modelos consultados directamente al formulario de cita.
- **Narrativa de Marca & Artesanía**:
  - **Conóceme**: Biografía, trayectoria y filosofía del atelier.
  - **Nuestro Proceso**: Etapas del proceso artesanal desde el primer boceto hasta la entrega final.
  - **Prensa**: Publicaciones editoriales, reportajes y apariciones en medios especializados.
- **Experiencia de Usuario (UX/UI)**:
  - Diseño minimalista, elegante y 100% responsivo.
  - Tipografías nobles (*Cinzel*, *Playfair Display*, *Plus Jakarta Sans*).
  - Transiciones de página suaves y gestión de títulos dinámicos en el navegador.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API con `<script setup>`)
- **Enrutamiento**: [Vue Router 4](https://router.vuejs.org/) (Modo History, scroll suave y metadatos)
- **Herramienta de Construcción (Bundler)**: [Vite 6](https://vitejs.dev/)
- **Gestor de Paquetes**: [pnpm](https://pnpm.io/)
- **Estilos**: CSS modular y responsivo optimizado para alta fidelidad visual

---

## 📁 Estructura del Proyecto

```text
MariaDiezmaWeb/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── assets/             # Estilos globales (CSS) e imágenes
│   │   ├── css/            # Estilos globales del proyecto (main.css)
│   │   └── images/         # Recursos gráficos y fotografías del atelier
│   ├── components/         # Componentes Vue reutilizables
│   │   ├── DressCard.vue   # Tarjeta de presentación de vestido/modelo
│   │   ├── FaqAccordion.vue# Acordeón de preguntas frecuentes
│   │   ├── TheNavbar.vue   # Barra de navegación principal y menú móvil
│   │   └── TheFooter.vue   # Pie de página con enlaces y contacto
│   ├── config/             # Configuración centralizada de la aplicación
│   │   └── env.js          # Acceso y fallback de variables de entorno Vite
│   ├── data/               # Fuentes de datos locales
│   │   └── dresses.js      # Catálogo de vestidos, especificaciones y colecciones
│   ├── router/             # Configuración de Vue Router y navegación
│   │   └── index.js
│   ├── views/              # Vistas principales de la aplicación (Páginas)
│   │   ├── HomeView.vue        # Portada principal
│   │   ├── ConocemeView.vue    # Historia y trayectoria
│   │   ├── ColeccionesView.vue # Catálogo general de vestidos
│   │   ├── DetalleView.vue     # Ficha técnica y galería de cada vestido
│   │   ├── ProcesoView.vue     # Explicación del proceso de confección a medida
│   │   ├── CitaView.vue        # Gestor interactivo de solicitud de cita
│   │   └── PrensaView.vue      # Artículos y apariciones en prensa
│   ├── App.vue             # Componente raíz con layout principal
│   └── main.js             # Punto de entrada de la aplicación Vue
├── .env.example            # Plantilla de variables de entorno
├── index.html              # HTML base con precarga de fuentes y metadatos SEO
├── package.json            # Scripts y dependencias del proyecto
├── vite.config.js          # Configuración de Vite y alias (@/ -> src/)
└── README.md
```

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos

- **Node.js**: versión 18 o superior recomendada.
- **pnpm**: versión 8 o superior (o npm / yarn).

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd MariaDiezmaWeb
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copia el archivo de plantilla `.env.example` a `.env.local` (o `.env`):

```bash
cp .env.example .env.local
```

Configura los valores según corresponda:

| Variable | Descripción | Valor por Defecto |
| :--- | :--- | :--- |
| `VITE_ENV` | Entorno de ejecución (`development`, `production`) | `development` |
| `VITE_APP_TITLE` | Título global de la aplicación | `María Diezma Atelier` |
| `VITE_BACKOFFICE_URI` | Endpoint base de la API o servidor de gestión de citas | `http://localhost:8080/api` |

### 4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 📜 Scripts Disponibles

En el `package.json` se definen los siguientes comandos:

| Comando | Acción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo local con Hot Module Replacement (HMR). |
| `pnpm build` | Compila y optimiza el proyecto para producción en la carpeta `dist/`. |
| `pnpm preview` | Lanza un servidor local para previsualizar el resultado de la carpeta `dist/`. |

---

## 🌐 Despliegue en Producción

Para desplegar la aplicación en servidores estáticos (como Nginx, Vercel, Netlify o Cloudflare Pages):

1. Genera los archivos de producción:
   ```bash
   pnpm build
   ```
2. Despliega la carpeta `dist/`.

> [!NOTE]
> Al ser una **Single Page Application (SPA)** con modo `createWebHistory()`, asegúrate de configurar el servidor web para redirigir todas las rutas a `index.html` para evitar errores 404 al recargar páginas internas.

---

## 📄 Licencia

Todos los derechos reservados © María Diezma Atelier.

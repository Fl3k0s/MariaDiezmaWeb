import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const IMAGE_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico', '.avif'
])

function syncAssetsImagesPlugin() {
  const rootDir = fileURLToPath(new URL('.', import.meta.url))
  const assetsImagesDir = path.resolve(rootDir, 'assets/images')
  const publicAssetsImagesDir = path.resolve(rootDir, 'public/assets/images')
  const assetsDir = path.resolve(rootDir, 'assets')
  const publicAssetsDir = path.resolve(rootDir, 'public/assets')

  const sync = () => {
    // 1. Sync assets/images to public/assets/images
    if (fs.existsSync(assetsImagesDir)) {
      if (!fs.existsSync(publicAssetsImagesDir)) {
        fs.mkdirSync(publicAssetsImagesDir, { recursive: true })
      }

      // Copy all files and subdirectories
      fs.cpSync(assetsImagesDir, publicAssetsImagesDir, { recursive: true, force: true })

      // Clean orphan files in public/assets/images that no longer exist in assets/images
      const cleanOrphans = (srcDir, targetDir) => {
        if (!fs.existsSync(targetDir)) return
        const entries = fs.readdirSync(targetDir, { withFileTypes: true })
        for (const entry of entries) {
          const srcPath = path.join(srcDir, entry.name)
          const targetPath = path.join(targetDir, entry.name)

          if (!fs.existsSync(srcPath)) {
            fs.rmSync(targetPath, { recursive: true, force: true })
          } else if (entry.isDirectory()) {
            cleanOrphans(srcPath, targetPath)
          }
        }
      }
      cleanOrphans(assetsImagesDir, publicAssetsImagesDir)
    }

    // 2. Also sync any loose image files in assets/ root to public/assets/
    if (fs.existsSync(assetsDir)) {
      const topEntries = fs.readdirSync(assetsDir, { withFileTypes: true })
      for (const entry of topEntries) {
        if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase()
          if (IMAGE_EXTENSIONS.has(ext)) {
            if (!fs.existsSync(publicAssetsDir)) {
              fs.mkdirSync(publicAssetsDir, { recursive: true })
            }
            fs.copyFileSync(path.join(assetsDir, entry.name), path.join(publicAssetsDir, entry.name))
          }
        }
      }
    }
  }

  return {
    name: 'sync-assets-images',
    buildStart() {
      sync()
    },
    configureServer(server) {
      sync()
      if (fs.existsSync(assetsDir)) {
        server.watcher.add(assetsDir)
        server.watcher.on('all', (_event, filePath) => {
          if (filePath.startsWith(assetsDir)) {
            sync()
          }
        })
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), syncAssetsImagesPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: false
  }
})


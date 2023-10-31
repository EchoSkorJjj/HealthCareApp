import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, 
    strictPort: true,
    proxy: true,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  }
})

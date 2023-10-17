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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.jsx',
    css: true,
    reporters: ['verbose'],
    // coverage: {
    //   reporter: ['text', 'json', 'html'],
    //   include: ['src/**/*'],
    //   exclude: [],
    // }
  },
  // resolve: {
  //   // ...
  //   alias: {
  //     crypto: 'crypto-browserify',
  //   },
  // },
})

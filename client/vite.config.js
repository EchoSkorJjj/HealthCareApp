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
  // test: {
  //   globals: true,
  //   testMatch: ['**/*.test.js', '**/*.test.jsx'],
  //   environment: 'jsdom',
  //   setupFiles: './src/setupTests.jsx',
  //   css: true,
  //   reporters: ['verbose'],
  //   coverage: {
  //     reporter: ['text', 'json', 'html'],
  //     // include: ['src/**/*'],
  //     include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  //     exclude: ['**/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'],
  //   }
  // },
  // resolve: {
  //   // ...
  //   alias: {
  //     crypto: 'crypto-browserify',
  //   },
  // },
})

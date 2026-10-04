import { defineConfig } from 'vite';
export default defineConfig({ build: { rollupOptions: { input: { home: 'index.html', scene: 'laboratorio.html', school: 'escola.html', worksheet: 'ficha.html' } } } });

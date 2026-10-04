import { defineConfig } from 'vite';
export default defineConfig({ build: { rollupOptions: { input: { scene: 'index.html', school: 'escola.html', worksheet: 'ficha.html' } } } });

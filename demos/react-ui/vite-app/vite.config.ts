import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    mode: 'development',
    plugins: [react()],
    define: {
        global: 'window',
    },
    build: {
        // Set false to speed up build process, should change to `true` for production mode.
        minify: false,
        cssMinify: false,
        sourcemap: false,
        cssCodeSplit: false,
        target: 'esnext',
    },
    server: {
        host: '0.0.0.0',
        port: 5003,
    },
});

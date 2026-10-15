import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    server: { hmr: false },
    experimental: { bundledDev: mode !== 'unbundled' }
}));

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    base: './', // ← CRITICAL for IPFS
    assetsInclude: [
        "**/*.xml",
    ],

    build: {
        outDir: '../docs',
        emptyOutDir: true,
        sourcemap: false,
        cssCodeSplit: false,

        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                editor: resolve(__dirname, 'src/editor/index.html')
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]',
                chunkFileNames: '[name].js'
            }
        }
    }
});

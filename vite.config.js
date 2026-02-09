import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: 'src',
    base: './', 
    assetsInclude: [
        "**/*.xml",
    ],
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            reloadOnPartialChange: true,
            context: {
                version: "v4.0.0-dev"
            } 
        }),
    ],
    build: {
        outDir: '../docs',
        emptyOutDir: true,
        sourcemap: false,
        cssCodeSplit: false,

        rollupOptions: {
            input: {
                root: resolve(__dirname, 'src/index.html'),
                editor: resolve(__dirname, 'src/editor/index.html'),
                docs: resolve(__dirname, 'src/Docs/index.html')
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]',
                chunkFileNames: '[name].js'
            }
        }
    }
});

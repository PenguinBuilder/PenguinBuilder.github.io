import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

import {plugin as Md} from "vite-plugin-markdown";
import wrapper from "markdown-it-header-sections";
import MarkdownIt from 'markdown-it';
import hljs from "highlight.js";

const md = (new MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    `<sl-copy-button value="${str.replaceAll('"', "&quot;")}" class="code-copy-button"></sl-copy-button></code>`
                    +
                    '</pre>';
            } catch (__) {}
        }

        return '';
    }
})).use(wrapper)

export default defineConfig({
    root: 'src',
    base: './', 
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            reloadOnPartialChange: true,
            context: {
                version: "v4.0.0"
            } 
        }),
        Md({
            mode: ["html"] ,
            markdownIt: md,
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, "src/")
        }
    },
    build: {
        outDir: '../docs',
        emptyOutDir: true,
        sourcemap: false,
        cssCodeSplit: false,
        chunkSizeWarningLimit: Infinity,
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

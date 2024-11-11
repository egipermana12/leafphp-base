import { defineConfig } from 'vite';
import leaf from '@leafphp/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from "tailwindcss";

export default defineConfig({
    plugins: [
        leaf({
            input: ['app/views/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve:{
        alias: {
            '@layout': resolve(__dirname, 'app/views/js/Layout'),
            '@components': resolve(__dirname, 'app/views/js/Components'),
            '@utils': resolve(__dirname, 'app/views/js/Utils'),
            '@services': resolve(__dirname, 'app/views/js/Services'),
            '@parts': resolve(__dirname, 'app/views/js/Parts'),
        }
    },
    css: {
        postcss: {
          plugins: [tailwindcss()],
        },
    },
});

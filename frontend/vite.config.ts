import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [basicSsl()],
    server: {
        port: 4000,
        https: true,
        host: true, // Exposes the server to the network
    },
});

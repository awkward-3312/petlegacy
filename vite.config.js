// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/petlegacy/', // 👈 muy importante: el nombre de tu repo con /
  plugins: [react()],
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
});

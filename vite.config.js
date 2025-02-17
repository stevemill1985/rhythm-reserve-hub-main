import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Ensures @/ works
    },
  },
  base: '/rhythm-reserve-hub-main/', // 👈 Set this to your repo name
});

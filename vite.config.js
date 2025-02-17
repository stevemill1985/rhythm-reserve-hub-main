import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/rhythm-reserve-hub-main/', // 👈 Use your GitHub repo name here
});

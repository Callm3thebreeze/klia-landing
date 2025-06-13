import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel(),
  vite: {
    define: {
      // Solo define las variables de entorno específicas que necesites
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // Agrega aquí otras variables específicas que necesites
    },
  },
});

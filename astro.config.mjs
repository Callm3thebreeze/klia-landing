import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: undefined, // Will be set for production builds
  vite: {
    define: {
      'process.env': process.env
    }
  }
});

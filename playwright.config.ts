import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 30000,
  reporter: 'html', // Formato de reporte
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure', // Guarda videos si fallan las pruebas
  },
});

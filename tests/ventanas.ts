import { chromium, Browser, Page } from 'playwright';

export async function probarNuevaVentana() {
  let browser: Browser | null = null;

  try {
    // Iniciar el navegador Chromium
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // Navegar a la página
    await page.goto('https://demoqa.com/browser-windows');

    // Esperar al botón y hacer clic para abrir la nueva ventana
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Esperar a que se abra una nueva página
      page.click('text=New Window') // Hacer clic en el botón de abrir ventana
    ]);

    // Esperar a que la nueva página se cargue
    await newPage.waitForLoadState();

    // Verificar el contenido de la nueva página para asegurarnos que es la ventana correcta
    const content = await newPage.textContent('body');
    console.log('Contenido de la nueva página:', content);

    // Cerrar la nueva ventana
    await newPage.close();

  } catch (error) {
    console.error('Error al ejecutar la prueba de nueva ventana:', error);
  } finally {
    // Asegurarse de cerrar el navegador
    if (browser) {
      await browser.close();
    }
  }
}

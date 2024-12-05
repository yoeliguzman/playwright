import { chromium, Browser, Page } from 'playwright';

export async function probarSmallModal() {
  let browser: Browser | null = null;

  try {
    // Iniciar el navegador Chromium
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // Navegar a la página de prueba de modales
    await page.goto('https://demoqa.com/modal-dialogs');

    // Hacer clic en el botón para abrir el modal pequeño
    await page.click('text=Small modal');

    // Esperar a que el modal esté visible
    await page.waitForSelector('.modal-content', { state: 'visible' });

    // Obtener el texto dentro del modal
    const modalText = await page.textContent('.modal-body');

    // Verificar si el texto es el esperado
    if (modalText?.includes('This is a small modal. It has very less content')) {
      console.log('Prueba de modal pequeño exitosa');
    } else {
      console.error(
        `Prueba de modal pequeño fallida. Texto encontrado: "${modalText}"`
      );
    }

    // Hacer clic en el botón "Close" del modal
    await page.click('button:has-text("Close")');

    // Tomar una captura de pantalla del estado final
    await page.screenshot({ path: 'imagenes/small_modal.png' });

  } catch (error) {
    console.error('Error al ejecutar la prueba de modal pequeño:', error);
  } finally {
    // Asegurarse de cerrar el navegador
    if (browser) {
      await browser.close();
    }
  }
}

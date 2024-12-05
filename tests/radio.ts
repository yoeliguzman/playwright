import { chromium, Browser, Page } from 'playwright';

export async function probarRadioButton() {
  // Iniciar el navegador Chromium
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();

  try {
    // Navegar a la URL de demoqa
    await page.goto('https://demoqa.com/');

    // Hacer clic en la opción "Elements"
    await page.click('text="Elements"');

    // Hacer clic en la opción "Radio Button"
    await page.click('text="Radio Button"');

    // Hacer clic en el botón de radio "Yes"
    await page.click('label[for="yesRadio"]');

    // Esperar hasta que el texto "Yes" sea visible en la página
    await page.waitForSelector('.text-success', { state: 'visible' });

    // Verificar si el selector existe y tiene contenido
    const selectedText = await page.textContent('.text-success');
    if (selectedText && selectedText.includes('Yes')) {
      console.log('Prueba de radiobutton exitosa');
    } else {
      console.log('Prueba de radiobutton fallida');
    }

    // Tomar captura de pantalla del formulario completo
    await page.screenshot({ path: 'imagenes/radio.png' });
  } catch (error) {
    console.error('Error al ejecutar la prueba de radiobutton:', error);
  } finally {
    // Cerrar el navegador
    await browser.close();
  }
};

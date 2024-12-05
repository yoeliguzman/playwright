import { chromium, Browser, Page } from 'playwright';

export async function probarCheckbox() {
  let browser: Browser | null = null;

  try {
    // Iniciar el navegador Chromium
    browser = await chromium.launch({ headless: false });
    const page: Page = await browser.newPage();

    // Navegar a la URL de demoqa
    await page.goto('https://demoqa.com/');

    // Hacer clic en la opción "Elements"
    await page.click('text="Elements"');

    // Hacer clic en la opción "Check Box"
    await page.click('text="Check Box"');

    // Expandir todas las opciones del árbol
    await page.click('button[aria-label="Expand all"]');

    // Marcar las casillas "Notes" y "React"
    await page.check('text="Notes"');
    await page.check('text="React"');

    // Obtener el texto del resultado
    const resultText = await page.textContent('#result');

    // Verificar que el texto contiene las palabras 'notes' y 'react'
    if (resultText && resultText.includes('notes') && resultText.includes('react')) {
      console.log('Prueba de checkbox exitosa');
    } else {
      console.error('Prueba de checkbox fallida: El resultado no contiene los textos esperados.');
    }

    // Tomar captura de pantalla del estado final
    await page.screenshot({ path: 'imagenes/checkbox.png' });
  } catch (error) {
    console.error('Error al ejecutar la prueba de checkbox:', error);
  } finally {
    // Asegurarse de cerrar el navegador
    if (browser) {
      await browser.close();
    }
  }
}

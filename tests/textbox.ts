import { chromium, Browser, Page } from 'playwright';

export async function probarTextBox() {
  let browser: Browser | null = null;

  try {
    // Iniciar el navegador Chromium
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // Definir los datos a ingresar
    const nombre = 'Yoeli Ismael Guzman';
    const correo = 'yoeli@ejemplo.com';
    const currentAddress = 'San Salvador, El Salvador';
    const permanentAddress = 'El Paraiso, Chalatenango';

    // Navegar a la URL de demoqa
    await page.goto('https://demoqa.com/');

    // Hacer clic en la opción "Elements"
    await page.click('text="Elements"'); 

    // Hacer clic en la opción "Text Box"
    await page.click('text="Text Box"'); 

    // Llenar los campos del formulario
    await page.fill("#userName", nombre);
    await page.fill("#userEmail", correo);
    await page.fill("#currentAddress", currentAddress);
    await page.fill("#permanentAddress", permanentAddress);

    // Desplazar la página hacia abajo para hacer visible el botón de enviar
    await page.evaluate(() => window.scrollBy(0, 500));

    // Hacer clic en el botón "Submit"
    await page.click('#submit');

    // Capturar el contenido del #output después de enviar el formulario
    const output = await page.locator('#output').textContent();

    // Definir los contenidos esperados para validación
    const expectedName = `Name:${nombre}`;
    const expectedEmail = `Email:${correo}`;
    const expectedCurrentAddress = `Current Address :${currentAddress}`;
    const expectedPermanentAddress = `Permanent Address :${permanentAddress}`;

    // Validar que el contenido en #output sea el esperado
    if (output?.includes(expectedName) && 
        output?.includes(expectedEmail) &&
        output?.includes(expectedCurrentAddress) &&
        output?.includes(expectedPermanentAddress)) {
      console.log('Validación exitosa: Los datos son correctos.');
    } else {
      console.log('Error: Los datos no coinciden.');
    }

    // Tomar captura de pantalla del formulario completo
    await page.screenshot({ path: 'imagenes/textbox.png' });

  } catch (error) {
    console.error('Error al ejecutar la prueba de Text Box:', error);
  } finally {
    // Asegurarse de cerrar el navegador
    if (browser) {
      await browser.close();
    }
  }
}

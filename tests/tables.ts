import { chromium, Browser, Page } from 'playwright';

export async function probarTabla() {
  let browser: Browser | null = null;

  try {
    // Iniciar el navegador Chromium
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // Definir los datos que se van a ingresar en la tabla
    const nombre = 'Yoeli Ismael';
    const apellido = 'Guzman Chavez';
    const correo = 'yoeli@ejemplo.com';
    const edad = '35';
    const salario = '1100';
    const departamento = 'QA';

    // Navegar a la URL del sitio demoqa
    await page.goto('https://demoqa.com/');

    // Hacer clic en la opción "Elements" para acceder al menú de elementos
    await page.click('text="Elements"');

    // Hacer clic en "Web Tables" para abrir la tabla interactiva
    await page.click('text="Web Tables"');

    // Obtener todo el texto dentro de la tabla que contiene los registros
    const obtenerTextoTabla = async () => await page.textContent('.rt-tbody') ?? '';
    let selectedText = await obtenerTextoTabla();

    // Verificar si el nombre ya existe en la tabla
    if (selectedText.includes(nombre)) {
      // Si el nombre ya está en la tabla, buscar la fila correspondiente y la elimina
      await page.click(`//div[text()="${nombre}"]/ancestor::div[contains(@class, "rt-tr")]//span[@title="Delete"]`);
      // Esperar a que la tabla se actualice
      await page.waitForTimeout(1000);
    } else {
      // Si el nombre no está en la tabla, agregar un nuevo registro

      // Hacer clic en el botón "Add" para abrir el formulario de creación de un nuevo registro
      await page.click('#addNewRecordButton');

      // Rellenar el formulario con los datos proporcionados
      await page.fill("#firstName", nombre);
      await page.fill("#lastName", apellido);
      await page.fill("#userEmail", correo);
      await page.fill("#age", edad);
      await page.fill("#salary", salario);
      await page.fill("#department", departamento);

      // Hacer clic en el botón "Submit" para guardar el registro
      await page.click('#submit');
      // Esperar a que la tabla se actualice
      await page.waitForTimeout(1000);
    }

    // Obtener todo el texto dentro de la tabla nuevamente para verificar la operación
    selectedText = await obtenerTextoTabla();

    // Después de la operación (eliminar o agregar), verificar si el nombre aparece en la tabla
    if (selectedText.includes(nombre)) {
      console.log("Prueba agregar registro a tabla exitosa");
    } else {
      console.log("Prueba agregar registro a tabla fallida");
    }

    // Bajar un poco para tomar captura
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Esperar 2 segundos mientras se cierra el modal
    await page.waitForTimeout(2000);

    // Tomar captura de pantalla del estado actual de la tabla
    await page.screenshot({ path: 'imagenes/table.png' });

  } catch (error) {
    console.error('Error al ejecutar la prueba de tabla interactiva:', error);
  } finally {
    // Asegurarse de cerrar el navegador
    if (browser) {
      await browser.close();
    }
  }
}

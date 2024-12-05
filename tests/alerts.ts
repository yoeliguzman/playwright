import { chromium, Dialog } from 'playwright';

export async function probarAlerts() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navegar a la página de ejemplo
  await page.goto('https://demoqa.com/alerts');

  // Manejar el evento de diálogo
  page.on('dialog', async (dialog: Dialog) => {
    console.log(dialog.message()); // Muestra el mensaje del diálogo en la consola

    // Verifica el tipo de diálogo y responde en consecuencia
    if (dialog.type() === 'alert' || dialog.type() === 'confirm') {
      await dialog.accept(); // Acepta la alerta o confirmación
    } else if (dialog.type() === 'prompt') {
      await dialog.accept('Yoeli Ismael Guzman'); // Acepta el prompt con un mensaje
    } else {
      await dialog.dismiss(); // Cancela cualquier otro tipo de diálogo
    }
  });

  // Haz clic en el botón para mostrar una alerta
  await page.click('#alertButton'); // Click en "Click me" para ver la alerta
  
  // Haz clic en el botón para mostrar una confirmación
  await page.click('#confirmButton'); // Click en "Click me" para ver la confirmación

  // Haz clic en el botón para mostrar un prompt
  await page.click('#promtButton'); // Click en "Click me" para ver el prompt

  //Toma una captura del resultado
  await page.screenshot({ path: 'imagenes/alerts.png' }); 
  
  // Espera unos segundos antes de cerrar el navegador para ver el resultado
  await page.waitForTimeout(1000);
  await browser.close();
};

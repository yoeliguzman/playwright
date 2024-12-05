
import { chromium, Browser, Page } from 'playwright';

export async function probarForm(){
  // Iniciar el navegador Chromium
  const browser: Browser = await chromium.launch({ headless: false }); 
  
  // Abrir una nueva pestaña
  const page: Page = await browser.newPage(); 

  // Definir los datos a ingresar
  let nombre = 'Yoeli Ismael';
  let apellido = 'Guzman Chavez';
  let correo = 'yoeli@ejemplo.com';
  let telefono = '5037788445';
  let nacimiento = '25 Aug 1988';
  let asunto = 'Computer';

  // Navegar a la URL del formulario
  await page.goto('https://demoqa.com/automation-practice-form'); // Visitar el sitio web donde se encuentra el formulario

  // Rellenar los campos del formulario
  await page.fill("#firstName", nombre); // Nombre
  await page.fill("#lastName", apellido); // Apellido
  await page.fill("#userEmail", correo); // Correo electrónico
  await page.click('label[for="gender-radio-1"]'); // Seleccionar género (Masculino)
  await page.fill("#userNumber", telefono); // Teléfono
  await page.fill("#dateOfBirthInput", nacimiento); // Fecha de nacimiento

  // Clic en el campo de asignaturas
  await page.locator('.subjects-auto-complete__value-container').click(); 
  
  // Clic de nuevo para asegurar que el campo esté activo
  await page.locator('.subjects-auto-complete__value-container').click(); 
  
  // Rellenar el campo con la palabra 'computer'
  await page.locator('#subjectsInput').fill('computer'); 
  
  // Seleccionar "Computer Science" de la lista desplegable
  await page.getByText('Computer Science', { exact: true }).click(); 

  // Selección de hobbies
  await page.click('label[for="hobbies-checkbox-1"]');

   // Hacer clic en "Select picture"
  await page.getByLabel('Select picture').click();

  // Subir la imagen 'prueba.jpg'
  await page.getByLabel('Select picture').setInputFiles('prueba.jpg'); 

  // Rellenar la dirección
  await page.getByPlaceholder('Current Address').click(); 
  await page.getByPlaceholder('Current Address').fill('Prueba'); 

  // Seleccionar estado y ciudad
  await page.locator('div').filter({ hasText: /^Select State$/ }).nth(3).click();

  // Seleccionar el estado "Haryana"
  await page.getByText('Haryana', { exact: true }).click(); 
  
  // Asegurar selección de Haryana
  await page.locator('div').filter({ hasText: /^Haryana$/ }).nth(1).click(); 
  
  // Seleccionar la ciudad "Rajasthan"
  await page.getByText('Rajasthan', { exact: true }).click(); 

  // Enviar el formulario
  await page.getByRole('button', { name: 'Submit' }).click(); 

  // Desplazar la página hacia abajo para hacer visible el botón de enviar
  await page.evaluate(() => window.scrollBy(0, 300)); 

  // Tomar captura de pantalla del formulario completo
  await page.screenshot({ path: 'imagenes/form.png' }); 

  // Cerrar el navegador
  await browser.close();
};

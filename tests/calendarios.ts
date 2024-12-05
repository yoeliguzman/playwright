import { chromium } from 'playwright';

export async function probarCalendarios() {
  const browser = await chromium.launch({
    headless: false // Modo no headless para ver la interacción
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navegar a la página de ejemplo
  await page.goto('https://demoqa.com/date-picker');

  // Seleccionar la primera fecha: 25 de agosto de 1988 utilizando el calendario
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('.react-datepicker__month-select').selectOption('7'); // Agosto
  await page.locator('.react-datepicker__year-select').selectOption('1988');
  await page.locator('.react-datepicker__day--025').nth(0).click();

  // Ingresar manualmente la segunda fecha: May 25, 1990 3:30 PM
  await page.locator('#dateAndTimePickerInput').fill('May 25, 1990 3:30 PM');

  // Tomar captura de pantalla
  await page.screenshot({ path: 'imagenes/calendarios.png' });

  await context.close();
  await browser.close();
}

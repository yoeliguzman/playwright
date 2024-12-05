// Importar los scripts de pruebas
import { test } from '@playwright/test';
import { probarCalendarios } from './calendarios';
import { probarAlerts } from './alerts';
import { probarCheckbox } from './checkbox';
import { probarForm } from './form';
import { probarSmallModal } from './modals';
import { probarRadioButton } from './radio';
import { probarTabla } from './tables';
import { probarTextBox } from './textbox';
import { probarNuevaVentana } from './ventanas';

test.describe('Ejecución individual de pruebas de UI', () => {

  test('Prueba de Calendarios', async () => {
    console.log('--- EJECUTANDO PRUEBA: CALENDARIOS ---');
    await probarCalendarios();
  });

  test('Prueba de Alertas', async () => {
    console.log('--- EJECUTANDO PRUEBA: ALERTAS ---');
    await probarAlerts();
  });

  test('Prueba de Checkboxes', async () => {
    console.log('--- EJECUTANDO PRUEBA: CHECKBOXES ---');
    await probarCheckbox();
  });

  test('Prueba de Formularios', async () => {
    console.log('--- EJECUTANDO PRUEBA: FORMULARIOS ---');
    await probarForm();
  });

  test('Prueba de Modales', async () => {
    console.log('--- EJECUTANDO PRUEBA: MODALS ---');
    await probarSmallModal();
  });

  test('Prueba de Radios', async () => {
    console.log('--- EJECUTANDO PRUEBA: RADIOS ---');
    await probarRadioButton();
  });

  test('Prueba de Tablas', async () => {
    console.log('--- EJECUTANDO PRUEBA: TABLAS ---');
    await probarTabla();
  });

  test('Prueba de Cajas de Texto', async () => {
    console.log('--- EJECUTANDO PRUEBA: TEXTBOX ---');
    await probarTextBox();
  });

  test('Prueba de Ventanas', async () => {
    console.log('--- EJECUTANDO PRUEBA: VENTANAS ---');
    await probarNuevaVentana();
  });

});

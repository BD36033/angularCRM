import { test, expect } from '@playwright/test';

test('Login avec succès', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  // Remplir les champs de connexion
  await page.fill('[data-test="username-input"]', 'bdessis');
  await page.fill('[data-test="password-input"]', 'DevBD3336++');

  // Cliquer sur le bouton de connexion
  await page.click('[data-test="submit-button"]');

  // Vérifier si l'utilisateur est redirigé
  await expect(page).toHaveURL('http://localhost:4200/administration');
});

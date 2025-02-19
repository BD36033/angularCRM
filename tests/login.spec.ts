import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('Login utilisateur avec succès', async ({ page }) => {
    await page.goto('http://localhost:4200/login');

    // Remplir les champs de connexion utilisateur
    await page.fill('[data-test="username-input"]', 'user1');
    await page.fill('[data-test="password-input"]', 'pdw123');

    // Cliquer sur le bouton de connexion
    await page.click('[data-test="submit-button"]');

    // Vérifier si l'utilisateur est redirigé vers l'accueil
    await expect(page).toHaveURL('http://localhost:4200/');
  });

  test('Login administrateur avec succès', async ({ page }) => {
    await page.goto('http://localhost:4200/login-admin');

    // Remplir les champs de connexion admin
    await page.fill('[data-test="username-input-admin"]', 'bdessis');
    await page.fill('[data-test="password-input-admin"]', 'DevBD3336++');

    // Cliquer sur le bouton de connexion admin
    await page.click('[data-test="submit-button-admin"]');

    // Vérifier si l'admin est redirigé vers l'administration
    await expect(page).toHaveURL('http://localhost:4200/administration');
  });

  test('Login utilisateur avec identifiants invalides', async ({ page }) => {
    await page.goto('http://localhost:4200/login');

    // Remplir les champs avec des identifiants invalides
    await page.fill('[data-test="username-input"]', 'invalid');
    await page.fill('[data-test="password-input"]', 'invalid');

    // Cliquer sur le bouton de connexion
    await page.click('[data-test="submit-button"]');

    // Vérifier le message d'erreur
    await expect(page.locator('.error-message')).toContainText('Identifiants invalides');
  });

  test('Login administrateur avec identifiants invalides', async ({ page }) => {
    await page.goto('http://localhost:4200/login-admin');

    // Remplir les champs avec des identifiants invalides
    await page.fill('[data-test="username-input-admin"]', 'invalid');
    await page.fill('[data-test="password-input-admin"]', 'invalid');

    // Cliquer sur le bouton de connexion admin
    await page.click('[data-test="submit-button-admin"]');

    // Vérifier le message d'erreur
    await expect(page.locator('.error-message')).toContainText('Identifiants administrateur invalides');
  });

  test('Redirection vers login admin lors de l\'accès à l\'administration sans authentification', async ({ page }) => {
    // Tenter d'accéder directement à l'administration
    await page.goto('http://localhost:4200/administration');

    // Vérifier la redirection vers la page de connexion admin
    await expect(page).toHaveURL('http://localhost:4200/login-admin');
  });
});

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generatePDF() {
  try {
    // Vérifier si le dossier playwright-report existe
    const reportPath = path.join(__dirname, 'playwright-report', 'index.html');
    if (!fs.existsSync(reportPath)) {
      console.error('Rapport Playwright non trouvé. Exécutez d\'abord les tests.');
      return;
    }

    // Lancer le navigateur
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Charger le rapport HTML
    await page.goto(`file:${reportPath}`);

    // Attendre que la page soit complètement chargée
    await page.waitForSelector('body');

    // Générer le PDF
    const pdfPath = path.join(__dirname, 'test-report.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    console.log(`PDF généré avec succès : ${pdfPath}`);
    await browser.close();
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
  }
}

generatePDF(); 
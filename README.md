# Gestionnaire de Locaux

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Prérequis

- Node.js (v18 ou supérieur)
- Angular CLI (`npm install -g @angular/cli`)
- JSON Server pour l'API mock (`npm install -g json-server`)

## Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install
```

## Lancement du projet

1. Démarrer l'API mock (dans un terminal) :
```bash
json-server --watch db.json
```

2. Démarrer le serveur de développement Angular (dans un autre terminal) :
```bash
ng serve
```

L'application sera accessible à l'adresse `http://localhost:4200/`

## Identifiants de connexion

- Utilisateur : `Personaliser dans le fichier auth.service.ts`
- Mot de passe : `Personaliser dans le fichier auth.service.ts`

## Tests

### Tests unitaires avec Karma

Pour exécuter les tests unitaires :
```bash
ng test
```

### Tests E2E avec Cypress

1. Démarrer l'application en mode développement :
```bash
ng serve
```

2. Lancer Cypress :
```bash
# En mode interface graphique
npx cypress open

# Ou en mode console
npx cypress run
```

Les tests Cypress se trouvent dans le dossier `cypress/e2e/`.

### Tests E2E avec Playwright

1. Installer Playwright :
```bash
npm init playwright@latest
```

2. Lancer les tests Playwright :
```bash
# En mode interface graphique
npx playwright test --ui

# Ou en mode console
npx playwright test
```

Les tests Playwright se trouvent dans le dossier `tests/`.

## Structure du projet

```
src/
├── app/
│   ├── administration/    # Module d'administration des salles
│   ├── login/            # Composant de connexion
│   ├── services/         # Services (auth, etc.)
│   └── guards/           # Guards de sécurité
├── assets/               # Ressources statiques
└── environments/         # Configuration des environnements
```

## Fonctionnalités principales

- Authentification utilisateur
- Gestion des salles (CRUD)
- Liste des réservations
- Interface responsive

## Commandes utiles

```bash
# Générer un nouveau composant
ng generate component nouveau-composant

# Construire l'application pour la production
ng build --prod

# Lancer les tests avec couverture de code
ng test --code-coverage
```

## Contribution

1. Créer une branche pour votre fonctionnalité
2. Commiter vos changements
3. Pousser la branche
4. Créer une Pull Request

## Licence

[MIT](LICENSE)

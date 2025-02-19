describe('Login Page', () => {
  beforeEach(() => {
    // Visiter la page de login avant chaque test
    cy.visit('/login')
  })

  it('should display login form', () => {
    // Vérifier que les éléments du formulaire sont présents
    cy.get('mat-card-title').should('contain', 'Connexion')
    cy.get('[data-test="username-input"]').should('exist')
    cy.get('[data-test="password-input"]').should('exist')
    cy.get('[data-test="submit-button"]').should('exist')
  })

  it('should login successfully', () => {
    // Utilisation de force: true pour contourner le problème de recouvrement
    cy.get('[data-test="username-input"]').type('bdessis', { force: true })
    cy.get('[data-test="password-input"]').type('DevBD3336++', { force: true })
    
    // Soumettre le formulaire
    cy.get('[data-test="submit-button"]').click()

    // Vérifier la redirection
    cy.url().should('include', '/administration')
    
    // Vérifier que le nom d'utilisateur apparaît dans la navbar
    cy.get('.username').should('contain', 'bdessis')
  })

  it('should show error message with invalid credentials', () => {
    // Remplir le formulaire avec des identifiants invalides
    cy.get('[data-test="username-input"]').type('invalid', { force: true })
    cy.get('[data-test="password-input"]').type('invalid', { force: true })
    
    // Soumettre le formulaire
    cy.get('[data-test="submit-button"]').click()

    // Vérifier le message d'erreur
    cy.get('.error-message').should('contain', 'Identifiants invalides')
  })
}) 
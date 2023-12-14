/// <reference types="Cypress" />

Cypress._.times(2, function() {
    it('testa a página da política de privacidade de forma independente 2 vezes seguidas', function() {
        cy.visit('./src/privacy.html')
            .title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })  
})

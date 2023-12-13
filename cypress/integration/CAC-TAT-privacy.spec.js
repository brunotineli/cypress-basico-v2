/// <reference types="Cypress" />

describe('Política de privacidade', function() {
    it('testa a página da política de privacidade de forma independente', function() {
        cy.visit('./src/privacy.html')
            .title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})
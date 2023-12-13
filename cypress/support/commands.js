Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(first_name, last_name, email, comments) {
    cy.get('#firstName').type(first_name)
    cy.get('#lastName').type(last_name)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(comments)
    cy.contains('button', 'Enviar').click()
})
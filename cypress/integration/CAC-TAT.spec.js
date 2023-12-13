/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    }),

    it('verifica o título da aplicação', function() {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }),

    it('preenche os campos obrigatórios e envia formulário', function() {
        cy.get('#firstName').type(Cypress.env('first_name'))
        cy.get('#lastName').type(Cypress.env('last_name'))
        cy.get('#email').type('bruno.tineli@teste.com')
        cy.get('#open-text-area').type('Comentários')
        cy.get('button[type="submit"]').click()
        cy.get('.success')
            .should('be.visible')
    }),

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type(Cypress.env('first_name'))
        cy.get('#lastName').type(Cypress.env('last_name'))
        cy.get('#email').type('bruno.tineli')
        cy.get('#open-text-area').type('Comentários')
        cy.get('button[type="submit"]').click()
        cy.get('.error')
            .should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type(Cypress.env('first_name'), { log: true })
        cy.get('#lastName').type(Cypress.env('last_name'))
        cy.get('#email').type('bruno.tineli@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Comentários')
        cy.get('button[type="submit"]').click()
        cy.get('.error')
            .should('be.visible')        
    }),

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type(Cypress.env('first_name'))
                .should('have.value', Cypress.env('first_name'))
            .clear()
                .should('have.value', '')
    }),

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error')
            .should('be.visible')
    }),

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit(
            Cypress.env('first_name'),
            Cypress.env('last_name'),
            'bruno.tineli@teste.com',
            'Comments'
        )
        cy.get('.success')
            .should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    
    it('seleciona um produto (Mentoria) por seu indice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    
    it('marca o tipo de atendimento "Feedback', function() {
        cy.get('input[type="radio"][value="elogio"]')
            .check()
            .should('be.checked')
    })

    it('marca cada tipo de atendimento', function() {
        // cy.get('input[type="radio"]')
        //     .should('have.length', 3)
        //     .each(function($radio) {
        //         cy.wrap($radio)
        //             .check()
        //             .should('be.checked')
        //     })
        cy.get('input[type="radio"]')
            .check()
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
                .should('be.checked')
            .last()
                .uncheck()
                .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })        
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json', {encoding: null} ).as('exampleFile')
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@exampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })   
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})
  
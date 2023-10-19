/// <reference types="Cypress" />
describe('Login', () => {
    beforeEach(function() {
        cy.visit('https://dashboard-motordecredito.qa.lmmobilidade.com.br/')                            ///cy.visit = URL que quer acessar
    })

    it('com sucesso', function() {
        cy.get('#mat-input-0')
            .type('user_name')
        
    })
})
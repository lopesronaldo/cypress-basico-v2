Cypress.Commands.add ('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Ronaldo')
    cy.get('#lastName').type('Lopes')
    cy.get('#email').type('ronaldo.inv@gmail.com')
    cy.get('#open-text-area').type('Teste') 
    cy.get('button[type="submit"]').click()
})


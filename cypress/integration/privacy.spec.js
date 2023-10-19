it('testa a página da política de privacidade de forma independente', function(){   ///acessando a página de politica de privacidade direto pela url
        cy.visit('./src/privacy.html')     ///comando para acessar a url
        cy.contains('Talking About Testing').should('be.visible')   ///verificar que a página contém o elemento citado ('Talking About Testing')
    })
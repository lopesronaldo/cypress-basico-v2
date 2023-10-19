/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {  ///DESCRIBE = FEATURES
    beforeEach(function() {
        cy.visit('./src/index.html')                            ///cy.visit = URL que quer acessar
    })

    it('verifica o título da aplicação', function() {           ///IT = CASOS DE TESTE
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')     ///buscar título   --- be.equal = comparativo
    })

    it('Preenche os campos obrigátiorios e envia o formulário', function(){
        const longText = 'Teste  Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste ...'  ///Declaração de variável é 'const'
        cy.get('#firstName').type('Ronaldo')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('ronaldo.inv@gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0})    ///Propriedade utilizada para textos grandes, com o objetivo de levar menos tempo até concluir o teste completo
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')      ///validar se o elemento está visível
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){    ///.only serve para rodar apenas 1 caso de teste isolado
        cy.get('#firstName').type('Ronaldo')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('ronaldo.inv.gmail.com')
        cy.get('#open-text-area').type('teste')   
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')      ///validar se o elemento de erro está visível
    })

    it('validar campo telefone vazio quando preenchido com valor não-numerico', function(){    ///.only serve para rodar apenas 1 caso de teste isolado
        cy.get('#phone')
            .type('ABCDE')
            .should('have.value', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){  ///clicar no checkbox telefone
        cy.get('#firstName').type('Ronaldo')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('ronaldo@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')   
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')         
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){  
        cy.get('#firstName')
            .type('Ronaldo')
            .should('have.value', 'Ronaldo')    //verificar se realmente o campo está preenchido com Ronaldo
            .clear()
            .should('have.value', '')   //verificar se realmente o campo está vazio
        cy.get('#lastName')
            .type('Lopes')
            .should('have.value', 'Lopes')    
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('ronaldo@exemplo.com') 
            .should('have.value', 'ronaldo@exemplo.com')    
            .clear()
            .should('have.value', '') 
        cy.get('#phone-checkbox').check()
        cy.get('#phone')
            .type('campo vazio') 
            .should('have.value', '')    
            .type('81987632061') 
            .should('have.value', '81987632061') 
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible') 
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor(value)', function() {
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){    ///validar seleção em conjunto -- marcar radiobutton
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()        ///comando para desmarcar o último -- para desmarcar o primeiro, usar .first
            .uncheck()
            .should('not.be.checked')
    })

    it('demo upload de arquivo direto do PC', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('C:/Users/BLITE TI/Documents/LM Auto/WhiteLabel/CNH/CREDITO APROVADO/Breno Henrique da Mata.jpg')    ///NO CAMINHO DO ARQUIVO, UTILIZAR A BARRA NORMAL '/'
            .should(function($input){
                expect($input[0].files[0].name).to.equal('Breno Henrique da Mata.jpg')
        }) 
    })

    it('seleciona um arquivo da pasta fixtures', function(){    ///upload através de clicar
        cy.get('input[type="file"]')      
            .should('not.have.value')            ///validar que nenhum arquivo foi carregado, ou sejam, não tem nenhum valor
            .selectFile('cypress/fixtures/example.json')    ///NO CAMINHO DO ARQUIVO, UTILIZAR A BARRA NORMAL '/'  --- comando para fazer upload de arquivos com o Cypress
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')   ///verificar se o arquivo anexado foi o correto
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){    ///upload através de arraste aqui
        cy.get('input[type="file"]')     
            .should('not.have.value')                  ///validar que nenhum arquivo foi carregado, ou sejam, não tem nenhum valor
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})    ///NO CAMINHO DO ARQUIVO, UTILIZAR A BARRA NORMAL '/'  --- comando para fazer upload 'ARRASTANDO' de arquivos com o Cypress
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')   ///verificar se o arquivo anexado foi o correto
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){   ///upload de arquivo
        cy.fixture('example.json').as('sampleFile')      ///acessou a pasta 'fixture', pegou o arquivo 'example' e apelidou de 'sampleFile'
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')               ///chamou o 'sampleFile' apelidado dois steps acima
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')   ///verificou se o arquivo anexado foi o correto
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){   ///verificar se ao clicar no botão, será aberto ou não uma nova aba
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')   ///o '_blank' significa que o atributo selecionado ('#privacy a') vai ser aberto em uma nova aba
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){   ///verificar se, ao clicar no botão de politica de privacidade, a página será aberta
        cy.get('#privacy a')    
            .invoke('removeAttr', 'target')                 ///o  cypress não consegue validar uma aba diferente, pra isso é usado o removeAttr, ele removerá a ação de abrir em uma nova aba ('_blank')
            .click()
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')   ///validação de que a página realmente foi aberta
    })
})
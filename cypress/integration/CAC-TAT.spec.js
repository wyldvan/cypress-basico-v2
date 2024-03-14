/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('#firstName').type('Wyldvan', { delay: 0 })
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('Wyldvan08@gmail.com')
    cy.get('#open-text-area').type('nada dos nada dos nada haver! Neste exemplo, o texto é digitado na área de texto #open-text-area sem atraso entre as teclas, conforme solicitado no exercício. A propriedade delay é usada para personalizar o comportamento do comando .type(), permitindo que você controle o atraso entre as teclas digitadas 4.', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Wyldvan')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('Wyldvan08@gmail,com')
    cy.get('#open-text-area').type('nada dos nada dos nada haver!')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numerico', function () {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Wyldvan')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('Wyldvan08@gmail,com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('nada dos nada dos nada haver!')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Wyldvan')
      .should('have.value', 'Wyldvan')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Lima')
      .should('have.value', 'Lima')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('wyldvan@gmail.com')
      .should('have.value', 'wyldvan@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('95981292478')
      .should('have.value', '95981292478')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
})
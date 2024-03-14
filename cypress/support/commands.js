Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Wyldvan', { delay: 0 })
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('Wyldvan08@gmail.com')
    cy.get('#open-text-area').type('nada dos nada dos nada haver!')
    cy.contains('button', 'Enviar').click()
})

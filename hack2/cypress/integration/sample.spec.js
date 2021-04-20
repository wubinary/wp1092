describe('Cypress Sample Test', () => {
    // 1st test
    it('Root Div (100%)', () => {
        cy.visit('/')
        cy.get('#root')
    })
  })
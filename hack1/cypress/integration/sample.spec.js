describe('Cypress Sample Test', () => {
    // 1st test
    it('Root Div (100%)', () => {
        cy.visit('sample.html')
        cy.get('#root')
    })
  })
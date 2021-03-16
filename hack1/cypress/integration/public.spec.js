describe('Hackathon 1 Test', () => {
    // checkpoint 1
    it('[Basic] Correct comment number (5%)', () => {
        cy.visit('index.html')
        cy.get('#comment-num').should('have.text', '1則留言')
    })
  
    // checkpoint 2
    it('[Basic] Add buttons (10%)', () => {
        cy.visit('index.html')
        cy.get('#comment-button-group').children().eq(0).should('have.id', 'cancel-button')
        cy.get('#comment-button-group').children().eq(1).should('have.id', 'comment-button')
        cy.get('#cancel-button').should('have.text', '取消')
        cy.get('#comment-button').should('have.text', '留言')
    })

    // checkpoint 3
    it('[Basic] Button CSS (10%)', () => {
        cy.visit('index.html')
        cy.get('#cancel-button').should('have.css', 'border-style', 'none')
        cy.get('#cancel-button').should('have.css', 'border-radius', '2px')
        cy.get('#cancel-button').should('have.css', 'width', '72px')
        cy.get('#cancel-button').should('have.css', 'height', '40px')
        cy.get('#comment-button').should('have.css', 'border-style', 'none')
        cy.get('#comment-button').should('have.css', 'border-radius', '2px')
        cy.get('#comment-button').should('have.css', 'width', '72px')
        cy.get('#comment-button').should('have.css', 'height', '40px')
    })

    // checkpoint 4
    it('[Basic] Cancel Button Color (5%)', () => {
        cy.visit('index.html')
        cy.get('#cancel-button').should('have.css', 'background-color', 'rgb(255, 255, 255)')
        cy.get('#cancel-button').should('have.css', 'color', 'rgb(96, 96, 96)')
    })

    // checkpoint 5
    it('[Basic] Comment Button Color (5%)', () => {
        cy.visit('index.html')
        cy.get('#comment-button').should('have.css', 'background-color', 'rgb(204, 204, 204)')
        cy.get('#comment-button').should('have.css', 'color', 'rgb(255, 255, 255)')
    })

    // checkpoint 6
    it('[Basic] Comment Button Color Change (5%)', () => {
        cy.visit('index.html')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').should('have.css', 'background-color', 'rgb(6, 95, 212)')
        cy.get('#comment-input').clear()
        cy.get('#comment-button').should('have.css', 'background-color', 'rgb(204, 204, 204)')
    })

    // checkpoint 7
    it('[Basic] Clear Text Input (5%)', () => {
        cy.visit('index.html')
        cy.get('#comment-input').type('test')
        cy.get('#comment-input').should('have.value', 'test')
        cy.get('#comment-button').click()
        cy.get('#comment-input').should('have.value', '')
        cy.get('#comment-button').should('have.css', 'background-color', 'rgb(204, 204, 204)')
    })

    // checkpoint 8
    it('[Basic] Check Buttons Visibility (10%)', () => {
        cy.visit('index.html')
        cy.get('#cancel-button').should('not.be.visible')
        cy.get('#comment-button').should('not.be.visible')
        cy.get('#comment-input').click()
        cy.get('#cancel-button').should('be.visible')
        cy.get('#comment-button').should('be.visible')
    })

    // checkpoint 9
    it('[Basic] Hide The Buttons (5%)', () => {
        cy.visit('index.html')
        cy.get('#cancel-button').should('not.be.visible')
        cy.get('#comment-button').should('not.be.visible')
        cy.get('#comment-input').click()
        cy.get('#cancel-button').should('be.visible')
        cy.get('#comment-button').should('be.visible')
    })

    // checkpoint 10
    it('[Advanced] Leave a comment (10%)', () => {
        cy.visit('index.html')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-group').find('.comment:last-child').get('.comment-img')
        cy.get('#comment-group').find('.comment:last-child').contains('Toby Chen')
        cy.get('#comment-group').find('.comment:last-child').contains('test')
        cy.get('#cancel-button').should('be.visible')
        cy.get('#comment-button').should('be.visible')
    })

    // checkpoint 11
    it('[Advanced] Comment Number (10%)', () => {
        cy.visit('index.html')
        cy.get('#comment-num').should('have.text', '1則留言')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-num').should('have.text', '2則留言')
        cy.get('#comment-input').type('test')
        cy.get('#comment-button').click()
        cy.get('#comment-num').should('have.text', '3則留言')
    })
})
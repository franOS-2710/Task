class DemoPage {

    goToDemoPage() {
        cy.visit(Cypress.config('demoUrl2'))
        cy.get('h3').should('have.text', 'Welcome to thedemo page.')
    }

    selectPaymentFlow(paymentFlow) {
        cy.contains('span', paymentFlow).click()
        cy.get('h2').should('have.text', paymentFlow)
    }

    fillData(demo) {
        cy.get('input[value="2"]').click({ force: true })
        cy.get('#amount').type(demo.amount)
        cy.get('#email').type(demo.email)
        cy.get('input[value="SWEDBANK_LT"]').click({ force: true })
    }

    agreeWithTerms() {
        cy.get('#terms').click({ force: true })
    }

    confirmCheckboxForTermsExist() {
        cy.get('#terms').should('exist')
    }

    clickSubmit() {
        cy.get('form button[type="submit"]').click()
    }

    alertMessageShouldBe(expectedMessage) {
        cy.contains('span', expectedMessage).should('be.visible')
        cy.contains('span', expectedMessage).should('have.css', 'color', 'rgb(255, 59, 48)')
    }

    confirmRedirectionToSwedBank() {
        cy.get('div[class="logo"] img[alt="Swedbank"]').should('be.visible')
    }
}

export default new DemoPage;
class HomePage {

    goToHomePage() {
        cy.visit(Cypress.config('baseUrlUi'))
        cy.get('h1[class="hero-unit__title____r5dpiy"]').should('have.text', 'Launch into the future of payments')
    }

    acceptCookies() {
        cy.get('button[data-testid="CookieBanner-accept-all"]').click()
    }

    clickOnDemoFromNavBar() {
        cy.get('a[data-testid="navbar-demo"]').click()
        cy.get('a[href="https://demo.kevin.eu/"]').should('be.visible')
    }

    clickOnVisitDemo() {
        cy.get('a[href="https://demo.kevin.eu/"]').invoke('removeAttr', 'target').click()
        cy.get('h3').should('have.text', 'Welcome to thedemo page.')
    }
}

export default new HomePage;
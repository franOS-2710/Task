// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const requiredHeaders = {
    clientId: '84178c6f-15d8-4f68-9f04-b349fc7ec48a',
    clientSecret: '31a2055a5a47764c3ad25a54b3c1311f85d341f9db971b1054716f300b49b51f',
    redirectUrl: 'https://yourapp.com/callback'
}

// POST /pis/payment
Cypress.Commands.add('postPayment', function (payload) {
    cy.request({
        method: 'POST',
        url: '/pis/payment',
        body: payload,
        headers: {
            'client-Id': requiredHeaders.clientId,
            'client-Secret': requiredHeaders.clientSecret,
            'Redirect-URL': requiredHeaders.redirectUrl
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})


// GET /pis/payment{paymentId}
Cypress.Commands.add('getPaymentById', function (paymentId) {
    cy.request({
        method: 'GET',
        url: '/pis/payment/' + paymentId,
        headers: {
            'client-Id': requiredHeaders.clientId,
            'client-Secret': requiredHeaders.clientSecret,
            'Redirect-URL': requiredHeaders.redirectUrl
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('getPaymentByIdWithWrongClientId', function (paymentId) {
    cy.request({
        method: 'GET',
        url: '/pis/payment/' + paymentId,
        headers: {
            'client-Id': '84178c6f-15d8-4f68-9f04-b349fc7ecXXX',
            'client-Secret': requiredHeaders.clientSecret,
            'Redirect-URL': requiredHeaders.redirectUrl
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('postPaymentWithWrongClientSecret', function (payload) {
    cy.request({
        method: 'POST',
        url: '/pis/payment',
        body: payload,
        headers: {
            'client-Id': requiredHeaders.clientId,
            'client-Secret': '',
            'Redirect-URL': requiredHeaders.redirectUrl
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// GET /pis/payment{paymentId}/status
Cypress.Commands.add('getPaymentStatus', function (paymentId) {
    cy.request({
        method: 'GET',
        url: '/pis/payment/' + paymentId + '/status',
        headers: {
            'client-Id': requiredHeaders.clientId,
            'client-Secret': requiredHeaders.clientSecret,
            'Redirect-URL': requiredHeaders.redirectUrl
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// POST /pis/payment{paymentId}/refunds
Cypress.Commands.add('postPaymentRefund', function (payload) {
    cy.request({
        method: 'POST',
        url: '/pis/payment/' + Cypress.env('paymentId') + '/refunds',
        body: payload,
        headers: {
            'client-Id': requiredHeaders.clientId,
            'client-Secret': requiredHeaders.clientSecret,
            'Redirect-URL': requiredHeaders.redirectUrl
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})
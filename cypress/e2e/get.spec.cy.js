

describe('GET /pis/payment', function () {

    const payment = {
        amount: 50.02,
        currencyCode: 'USD',
        description: 'new payment',

        bankPaymentMethod: {
            creditorName: 'Jack',
            endToEndId: '456',
            informationStructured: {
                reference: 'new reference',
                referenceType: 'Scor'
            },

            creditorAccount: {
                iban: 'LT177300010119765165'
            },

            debitorAccount: {
                iban: 'LT177300010119765165'
            }
        }
    }

    context('When there is a registered payment', function () {

        before(function () {
            cy.postPayment(payment).then(function (response) {
                Cypress.env('paymentId', response.body.id)
            })
        })

        it('Should search payment by id', function () {
            const id = Cypress.env('paymentId')
            cy.getPaymentById(id).then(function (response) {
                expect(response.status).to.eql(200)
            })
        })

        it('Should return status 400 when search for not existent id', function () {
            const id = '62faaeffa0cad44c9c080b87'
            cy.getPaymentById(id).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error.name).to.eql('InvalidPaymentId')
                expect(response.body.error.description).to.eql('Invalid payment id.')
            })
        })

        it('Should return status 401 when search with Client-Id or Client-Secret incorrect', function () {
            const id = Cypress.env('paymentId')
            cy.getPaymentByIdWithWrongClientId(id).then(function (response) {
                expect(response.status).to.eql(401)
                expect(response.body).to.eql('Unauthorized')
            })
        })
    })
})

describe('GET /pis/payment/status', function () {

    const payment = {
        amount: 50.02,
        currencyCode: 'USD',
        description: 'new payment',

        bankPaymentMethod: {
            creditorName: 'Jack',
            endToEndId: '456',
            informationStructured: {
                reference: 'new reference',
                referenceType: 'Scor'
            },

            creditorAccount: {
                iban: 'LT177300010119765165'
            },

            debitorAccount: {
                iban: 'LT177300010119765165'
            }
        }
    }

    context('When there is a started payment', function () {

        before(function () {
            cy.postPayment(payment).then(function (response) {
                Cypress.env('paymentId', response.body.id)
            })
        })

        it('Should get payment status', function () {
            const id = Cypress.env('paymentId')
            cy.getPaymentStatus(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.group).to.eql('started')
            })
        })

        it('Should return status 400 when get status for payment id that does not exist', function () {
            const id = '62faaeffa0cad44c9c080b87'
            cy.getPaymentStatus(id).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error.name).to.eql('InvalidPaymentId')
                expect(response.body.error.description).to.eql('Invalid payment id.')
            })
        })
    })
})
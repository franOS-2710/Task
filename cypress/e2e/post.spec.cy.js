

describe('POST /pis/payment', function () {

    it('Should initiate payment', function () {

        const payment = {
            amount: 0.02,
            currencyCode: 'EUR',
            description: 'test',

            bankPaymentMethod: {
                creditorName: 'Nick',
                endToEndId: '123',
                informationStructured: {
                    reference: 'test',
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

        cy.postPayment(payment)
            .then(function (response) {
                expect(response.status).to.eql(200)
                cy.log(response.body.id)
                expect(response.body.id.length).greaterThan(0)
            })
    })

    it('Should return status 400 when initiate payment with wrong iban for creditor account', function () {

        const paymentWithWrongIban = {
            amount: 350.00,
            currencyCode: 'GBP',
            description: 'test',

            bankPaymentMethod: {
                creditorName: 'Anne',
                endToEndId: '19087',
                informationStructured: {
                    reference: 'Anne ref',
                    referenceType: 'Scor'
                },

                creditorAccount: {
                    iban: 'LT507044060008113345'
                },

                debitorAccount: {
                    iban: 'LT177300010119765165'
                }
            }
        }

        cy.postPayment(paymentWithWrongIban)
            .then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error.name).to.eql('CreditorIbanNotAllowed')
                expect(response.body.error.description).to.eql('Creditor iban is not allowed.')
            })
    })

    it('Should return status 401 when initiate payment with no Client-Secret', function () {

        const paymentData = {
            amount: 210.10,
            currencyCode: 'EUR',
            description: 'test',

            bankPaymentMethod: {
                creditorName: 'Josh',
                endToEndId: '15674',
                informationStructured: {
                    reference: 'ref',
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

        cy.postPaymentWithWrongClientSecret(paymentData)
            .then(function (response) {
                expect(response.status).to.eql(401)
                expect(response.body).to.eql('Unauthorized')
            })

    })
})

describe('POST /pis/payment{paymentId}/refunds', function () {

    it('Should return status 400 when initiate refund with payment incompleted', function () {

        const payment = {
            amount: 532.80,
            currencyCode: 'EUR',
            description: 'test',

            bankPaymentMethod: {
                creditorName: 'Nick',
                endToEndId: '123',
                informationStructured: {
                    reference: 'test',
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

        const refund = {
            amount: 300.00
        }

        cy.postPayment(payment)
            .then(function (response) {
                expect(response.status).to.eql(200)
                Cypress.env('paymentId', response.body.id)
            })

        cy.postPaymentRefund(refund)
            .then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error.name).to.eql('PaymentMustBeCompleted')
                expect(response.body.error.description).to.eql('Payment must be completed.')
            })
    })
})
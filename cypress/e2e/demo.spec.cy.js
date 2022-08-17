import demo from '../pages/DemoPage'
import DemoFactory from '../factories/DemoFactory'

describe('demoPage', function () {

    it('Should choose redirect payment flow', function () {
        demo.goToDemoPage()
        demo.selectPaymentFlow('Redirect payment flow')
    })

    it('Should fill fields and submit', function () {

        var demoFactory = DemoFactory.demo()

        const expectedMessage = 'You have to agree to the terms and conditions and privacy policy'

        demo.fillData(demoFactory)
        demo.confirmCheckboxForTermsExist()
        demo.clickSubmit()

        demo.alertMessageShouldBe(expectedMessage)

        demo.agreeWithTerms()
        demo.clickSubmit()
        demo.confirmRedirectionToSwedBank()
    })

})
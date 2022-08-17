import homepage from '../pages/HomePage'


describe('homepage', function () {

    it('App should be online', function () {
        homepage.goToHomePage()
    })

    it('Should accept cookies', function () {
        homepage.acceptCookies()
    })

    it('Should go to Demo page', function () {
        homepage.clickOnDemoFromNavBar()
        homepage.acceptCookies()
        homepage.clickOnVisitDemo()
    })
})


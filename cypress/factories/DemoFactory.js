import { faker } from '@faker-js/faker';


export default {

    demo: function () {

        var data = {
            amount: '0.01',
            email: faker.internet.email()
        }

        return data
    }
}
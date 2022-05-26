import supertest from 'supertest'

class AuthHelper {
    // constructor() {
    //     this.response = null;
    // }
    // response - вернет undefined
    response
    async login(username, password) {
        await supertest(process.env.BASE_URL)
            .post('/auth')
            .send({login:username, password:password})
            .then(res => {
                this.response = res
            })
    }

}
export default AuthHelper

// const login = (username, password) => {    ТАК ТОЖЕ МОЖНО, ИСПОЛЬЗОВАТЬ КЛАССЫ НЕОБЯЗАТЕЛЬНО
//     await supertest(process.env.BASE_URL)
//         .post('/auth')
//         .send({login:username, password:password})
//         .then(res => {
//             this.response = res
//         })


import {expect} from 'chai'
import AuthHelper from '../helpers/auth.helper'


describe('Auth', function(){
    let authHelper = new AuthHelper()

    describe('Successful login', function(){
        before(async function(){  //чтобы понять, нужна нам ассинхронная или просто функция, нажми на debug. Если статус Pending и объект Promise - ставим async function
             await authHelper.login(process.env.LOGIN, process.env.PASSWORD) // await оператор используется только внутри ассинхронных функций
        })

        it('response status code is 200', function(){
            expect(authHelper.response.statusCode).to.eq(200)
                })
        it('response body contains authorization token', function(){
            expect(authHelper.response.body.token).not.to.be.undefined
        })
        })


describe('Login with invalid credentials', function(){

    before(async function(){

        await authHelper.login('invalid','invalid')
    })

    it('response status code is 404', function(){
        expect(authHelper.response.statusCode).to.eq(404)
    })

    it('response body contains error message', function(){
        expect(authHelper.response.body.message).to.eq('Wrong login or password.')
    })
    })
})


import UsersHelper from '../helpers/users.helper'
import { getRandomItem} from "../helpers/common.helper";
import {expect} from 'chai'


describe('Users', function(){
    let userHelper = new UsersHelper() //создаем дубликат
    let userId

    before(async function () {
        await userHelper.create() //Отправляем запрос на создание клиента
        userId = userHelper.response.body.id //Обращаемся к переменной(response(из users.helper)) - body.id = синтаксис http-запроса. Мы ожидаем, что сервер пришлет нам токен с айди, поэтому пишем id
    })

describe('user creation', function() {
    before(async function(){
        await userHelper.getByID(userId)
    })

    it('response status code is 200', function () {
        expect(userHelper.response.statusCode).to.eq(200)
    })

    it('response body contains user id', function () {
        expect(userHelper.response.body.id).not.to.be.undefined
    })

    it('response body contains initial amount', function () {
        expect(userHelper.response.body.amount).not.to.be.undefined
    })
  })

    describe('get user by ID', function() {

        it('response status code is 200', function () {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('response body contains user id', function () {
            expect(userHelper.response.body.id).not.to.be.undefined
        })

        it('response body contains initial amount', function () {
            expect(userHelper.response.body.amount).not.to.be.undefined
        })
    })

    describe('get all users', function() {

        before(async function(){
            await userHelper.create()
            await userHelper.getAll()
        })

        it('response status code is 200', function () {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('response body contains list of 2 or more items', function () {
            expect(userHelper.response.body.length).to.be.at.least(2)
        })

        it('response body array item contains user id', function () {
            expect(getRandomItem(userHelper.response.body).id).not.to.be.undefined
        })

        it('response body array item contains initial amount', function () {
            expect(getRandomItem(userHelper.response.body).amount).not.to.be.undefined
        })
    })
    describe('user deletion', function() {
        before(async function(){
            await userHelper.delete(userId)
        })

        it('response status code is 200', function () {
            expect(userHelper.response.statusCode).to.eq(200)
        })

        it('response body contains success message', function(){
            expect(userHelper.response.body.message).to.eq('User deleted.')
        })
    })
})
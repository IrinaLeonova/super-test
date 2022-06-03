import TransactionsHelper from "../helpers/transactions.helper";
import {expect} from 'chai'
import UsersHelper from '../helpers/users.helper'
import { getRandomItem} from "../helpers/common.helper";

//This describe is a main test suite
describe('Transactions', function() {
    let transactionsHelper = new TransactionsHelper()
    let usersHelper = new UsersHelper()
    let Users1Id
    let UsersId2
    let transactionId
    let amount1 = Math.floor(Math.random() * 300)


//preconditions: we have to create 2 users to be able to make 1 transaction
    before(async function(){
        await usersHelper.create()
        Users1Id = usersHelper.response.body.id
        await usersHelper.create()
        UsersId2 = usersHelper.response.body.id
    })
    after(async function() {
        // const configHelper = new ConfigHelper()
        // await configHelper.wipeData()
    })

    describe('successful transaction creation', function(){
        before(async function(){
            //send async request using our HELPER method create
            await transactionsHelper.create(Users1Id,UsersId2,amount1)
            transactionId = transactionsHelper.response.body.id
        })

        it('response status code is 200',function(){
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })
        it('response body contains transaction id',function(){
            expect(transactionsHelper.response.body.id).not.to.be.undefined
        })
        it('response body contains FROM key ',function(){
            expect(transactionsHelper.response.body.from).not.to.be.undefined
        })
        it('response body contains FROM key ',function(){
            expect(transactionsHelper.response.body.from).to.eq(Users1Id)
        })
        it('response body contains FROM key ',function(){
            expect(transactionsHelper.response.body.to).not.to.be.undefined
        })
        it('response body contains TO key ',function(){
            expect(transactionsHelper.response.body.to).to.eq(UsersId2)
        })
        it('response body contains the right amount', function () {
            expect(transactionsHelper.response.body.amount).not.to.be.undefined
        })
        it('response body contains the right amount', function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount1)
        })
    })

    describe('get transaction by ID', function() {
        before(async function(){
            await transactionsHelper.getByID(transactionId)
        })

        it('response status code is 200', function () {
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })

        it('response body contains transaction id', function () {
            expect(transactionsHelper.response.body.id).not.to.be.undefined
        })

        it('response body contains FROM key ',function(){
            expect(transactionsHelper.response.body.from).to.eq(Users1Id)
        })

        it('response body contains FROM key ',function(){
            expect(transactionsHelper.response.body.to).not.to.be.undefined
        })

        it('response body contains TO key ',function(){
            expect(transactionsHelper.response.body.to).to.eq(UsersId2)
        })

        it('response body amount should not be empty', function () {
            expect(transactionsHelper.response.body.amount).not.to.be.undefined
        })

        it('response body contains the right amount', function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount1)
        })

    })

    describe('get all transactions', function() {

        before(async function(){
            await transactionsHelper.getAll()
        })

        it('response status code is 200', function () {
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })

        it('response body contains list of 2 or more items', function () {
            expect(transactionsHelper.response.body.length).to.be.at.least(1)
        })

        it('response body array item contains transaction id', function () {
            expect(getRandomItem(transactionsHelper.response.body).id).not.to.be.undefined
        })

        it('response body array item contains the right amount', function () {
            expect(getRandomItem(transactionsHelper.response.body).amount).not.to.be.undefined
        })
    })
})
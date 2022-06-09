import TransactionsHelper from "../helpers/transactions.helper";
import {expect} from 'chai'
import UsersHelper from '../helpers/users.helper'
import { getRandomItem } from "../helpers/common.helper";

//This describe is a main test suite
describe('Transactions', function() {
    let transactionsHelper = new TransactionsHelper()
    let usersHelper = new UsersHelper()
    let senderId, receiverId, transactionId
    let amount = Math.floor(Math.random() * 300)


//preconditions: we have to create 2 users to be able to make 1 transaction
    before(async function(){
        await usersHelper.create()
        senderId = usersHelper.response.body.id
        await usersHelper.create()
        receiverId = usersHelper.response.body.id
        await transactionsHelper.create(senderId, receiverId, amount)
        transactionId = transactionsHelper.response.body.id
    })


    describe ('successful transaction creation', function(){
        before(async function(){
            //send async request using our HELPER method create
            await transactionsHelper.create(senderId,receiverId,amount)
            transactionId = transactionsHelper.response.body.id
        })

        it('response status code is 200',function(){
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })
        it('response body contains transaction id',function(){
            expect(transactionsHelper.response.body.id).not.to.be.undefined
        })

        it('response body contains sender id ',function(){
            expect(transactionsHelper.response.body.from).to.eq(senderId)
        })
        it('response body contains receiver id ',function(){
            expect(transactionsHelper.response.body.to).to.eq(receiverId)
        })
        it('response body contains the right amount', function () {
            expect(transactionsHelper.response.body.amount).not.to.be.undefined
        })
        it('response body contains the right amount', function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount)
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
            expect(transactionsHelper.response.body.id).to.eq(transactionId)
        })

        it('response body contains receiver id ',function(){
            expect(transactionsHelper.response.body.from).to.eq(senderId)
        })

        it('response body contains receiver id ',function(){
            expect(transactionsHelper.response.body.to).to.eq(receiverId)
        })

        it('response body contains the right amount', function () {
            expect(transactionsHelper.response.body.amount).to.eq(amount)
        })

    })


    describe('get all transactions', function() {

        before(async function(){
            await transactionsHelper.create(senderId, receiverId, amount)
            await transactionsHelper.getAll()
        })

        it('response status code is 200', function () {
            expect(transactionsHelper.response.statusCode).to.eq(200)
        })

        it('response body contains list of 2 or more items', function () {
            expect(transactionsHelper.response.body.length).to.be.at.least(2)
        })

        it('response body array item contains transaction id', function () {
            expect(getRandomItem(transactionsHelper.response.body).id).not.to.be.undefined
        })

        it('response body array item contains the right amount', function () {
            expect(getRandomItem(transactionsHelper.response.body).amount).not.to.be.undefined
        })
    })
})
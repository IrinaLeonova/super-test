import supertest from 'supertest'

class TransactionsHelper {
    response

    async create(senderId, receiverId, amount) {
        //send async request
        await supertest(process.env.BASE_URL)
            // setup a request method - POST and an endpoint - /auth
            .post('/transactions')
            // Add token to uou request (for each protected route)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            //setup payload - object with 2 keys - login and password(and their values)
            .send({from: senderId, to: receiverId, amount: amount } )
            //save a response from server to result variable
            .then(res => {
                this.response = res
                console.log(res.body)
            })
    }
    async delete(id) {
        await supertest(process.env.BASE_URL)
            .delete('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send({id: id })
            .then(res => {
                this.response = res
            })
    }
    async getByID(id) {
        await supertest(process.env.BASE_URL)
            .get(`/transactions?id=${id}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }
    async getAll() {
        await supertest(process.env.BASE_URL)
            .get('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }
}
export default TransactionsHelper
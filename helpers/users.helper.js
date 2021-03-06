import supertest from "supertest";

class UsersHelper {
    response

    async create() {
        await supertest(process.env.BASE_URL)
            .post('/users')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }
    async delete(id) { // функции внутри классов называются методы
        await supertest(process.env.BASE_URL)
            .delete('/users')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .send({id: id })
            .then(res => {
                this.response = res //чтобы обратиться к контексту классов нужно исп ключевое слово this. Ответ сервера записывается в response
            })
    }
    async getByID(id) {
        await supertest(process.env.BASE_URL)
            .get(`/users?id=${id}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }
    async getAll() {
        await supertest(process.env.BASE_URL)
            .get('/users')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)
            .then(res => {
                this.response = res
            })
    }

}

export default UsersHelper
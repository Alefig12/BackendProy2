const supertest = require('supertest');
const express = require('express');
const app = express();

const{
    getUser,
    getUserById,
    createUser,
    putUser
} = require('../usuario.controller.js');
const userRoutes = require('../usuario.routes.js');

app.use('/usuario', userRoutes);

describe('pruebas de integración usuarios', () => {
    it('GET / debería devolver todos los usuarios', async () => {
        const response = await supertest(app).get('/user');
        expect(response.status).toBe(200);
    });

    it('GET /:id debería devolver el usuario con el ID correspondiente', async () => {
        const response = await supertest(app).get('/user/1');
        expect(response.status).toBe(200);
    });

    it('POST / debería crear un nuevo usuario', async () => {
        const response = await supertest(app)
            .post('/user')
            .send({
                name: 'test',
                email: 'test',
                password: 'test',
                phone: 'test',
                address: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(201);
    }
    );

    it('PUT /:id debería actualizar el usuario con el ID correspondiente', async () => {
        const response = await supertest(app)
            .put('/user/1')
            .send({
                name: 'test',
                email: 'test',
                password: 'test',
                phone: 'test',
                address: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(200);
    });

    it('DELETE /:id debería eliminar el usuario con el ID correspondiente', async () => {
        const response = await supertest(app).delete('/user/1');
        expect(response.status).toBe(200);
    });

    it('POST /login debería devolver el usuario con el email y password correspondiente', async () => {
        const response = await supertest(app)
            .post('/user/login')
            .send({
                email: 'test',
                password: 'test',
            });
        expect(response.status).toBe(200);
    });

    //Casos error
    it('POST /login debería devolver un error si no se envía el email', async () => {
        const response = await supertest(app)
            .post('/user/login')
            .send({
                password: 'test',
            });
        expect(response.status).toBe(400);
    });

    it('POST/ login debería devolver un error si no se envían los datos correctos', async () => {
        const response = await supertest(app)
            .post('/user/login')
            .send({
                email: 'test',
                password: 'test',
            });
        expect(response.status).toBe(400);
    });

    it('GET /:id debería devolver un error si el usuario no existe', async () => {
        const response = await supertest(app).get('/user/0');
        expect(response.status).toBe(404);
    });

    it('PUT /:id debería devolver un error si el usuario no existe', async () => {
        const response = await supertest(app)
            .put('/user/0')
            .send({
                name: 'test',
                email: 'test',
                password: 'test',
                phone: 'test',
                address: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(404);
    });

    it('DELETE /:id debería devolver un error si el usuario no existe', async () => {
        const response = await supertest(app).delete('/user/0');
        expect(response.status).toBe(404);
    }); 
});

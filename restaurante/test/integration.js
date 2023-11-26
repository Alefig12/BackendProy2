const supertest = require('supertest');
const express = require('express'); 
const app = express();

const{
    getRestaurantById,
    getRestaurants,
    createRestaurant,
    updateRestaurant
} = require('../restaurante.controller.js');
const restaurantRoutes = require('../restaurante.routes.js');

app.use('/restaurante', restaurantRoutes);  

describe('pruebas de integración restaurantes', () => {
    it('GET / debería devolver todos los restaurantes', async () => {
        const response = await supertest(app).get('/restaurante');
        expect(response.status).toBe(200);
    });

    it('GET /:id debería devolver el restaurante con el ID correspondiente', async () => {
        const response = await supertest(app).get('/restaurante/1');
        expect(response.status).toBe(200);
    });

    it('POST / debería crear un nuevo restaurante', async () => {
        const response = await supertest(app)
            .post('/restaurante')
            .send({
                name: 'test',
                address: 'test',
                category: 'test',
                admin: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(201);
    }
    );

    it('PUT /:id debería actualizar el restaurante con el ID correspondiente', async () => {
        const response = await supertest(app)
            .put('/restaurante/1')
            .send({
                name: 'test',
                address: 'test',
                category: 'test',
                admin: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(200);
    });

    //casos de error
    it('GET /:id/restaurant/:id_restaurant debería devolver un error si no se envía el id del usuario', async () => {
        const response = await supertest(app).get('/restaurante//restaurant/1');
        expect(response.status).toBe(404);
    });

    it('GET /:id/restaurant/:id_restaurant debería devolver un error si no se envía el id del restaurante', async () => {
        const response = await supertest(app).get('/restaurante/1/restaurant/');
        expect(response.status).toBe(404);
    });

    it('GET /:id/restaurant/:id_restaurant debería devolver un error si no se envía el id del usuario ni del restaurante', async () => {
        const response = await supertest(app).get('/restaurante//restaurant/');
        expect(response.status).toBe(404);
    });

    it('POST / debería devolver un error si no se envía el nombre', async () => {
        const response = await supertest(app)
            .post('/restaurante')
            .send({
                address: 'test',
                category: 'test',
                admin: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(400);
    });
    it('PUT /:id debería devolver un error si no se envía el nombre', async () => {
        const response = await supertest(app)
            .put('/restaurante/1')
            .send({
                address: 'test',
                category: 'test',
                admin: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(400);
    });
});
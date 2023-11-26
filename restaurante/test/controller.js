const supertest = require('supertest');
const app = require('../../restaurante.controller.js');
const restaurante = require('../restaurante.model.js');

describe('Controlador de Restaurante', () => {
    it('Debería obtener un restaurante por ID', async () => {
        const restauranteTest = new restaurante({
            name: 'Alo',
            category: 'Comida rápida',
            admin: '1234',
        });
        await restauranteTest.save();

        const response = await supertest(app)
        .get(`/restaurante/${restauranteTest._id}`);

        expect(response.body.name).toBe(restauranteTest.name);
    });

    // Prueba para getRestaurants
    it('Debería obtener todos los restaurantes', async () => {
        const restauranteTest = new restaurante({
            name: 'Alo',
            category: 'Comida rápida',
            admin: '1234',
        });
        await restauranteTest.save();   
        const response = await supertest(app)
        .get('/restaurante');

        expect(response.status).toBe(200);
    });

    // Prueba para createRestaurant
    it('Debería crear un restaurante', async () => {
        const response = await supertest(app)
        .post('/restaurante')
        .send({
            name: 'Alo1',
            category: 'Comida asiatica',
            admin: '12534',
        });

        expect(response.status).toBe(200);
    });

    // Prueba para updateRestaurant
    it('Debería actualizar un restaurante', async () => {
        const restauranteTest = new restaurante({
            name: 'Alo',
            category: 'Comida rápida',
            admin: '1234',
        });
        await restauranteTest.save();

        const response = await supertest(app)
        .put(`/restaurante/${restauranteTest._id}`)
        .send({
            name: 'Aloconrosa',
            category: 'Comida italiana',
            admin: '125346',
        });


        expect(response.body.name).not.toBe(restauranteTest.name);
    });

   //Pruebas para casos de no éxito
    it('No debería obtener un restaurante por un ID inexistente', async () => {
        const response = await supertest(app)
        .get(`/restaurante/321231321321`);

        expect(response.status).toBe(404);
    });

    it('No debería crear un restaurante con un admin inexistente', async () => {
        const response = await supertest(app)
        .post('/restaurante')
        .send({
            name: 'Alo',
            category: 'Comida rápida',
            admin: '1234',
        });

        expect(response.status).toBe(404);
    });

    it('No debería actualizar un restaurante con un ID inexistente', async () => {
        const response = await supertest(app)
        .put(`/restaurante/id-inexistente`)
        .send({
            name: 'Alo',
            category: 'Comida rápida',
            admin: '1234',
        });

        expect(response.status).toBe(404);
    });

    it('No debería actualizar un restaurante con un admin inexistente', async () => {
        const restauranteTest = new restaurante({
            name: 'Alo',
            category: 'Comida rápida',
            admin: '1234',
        });
        await restauranteTest.save();

        const response = await supertest(app)
        .put(`/restaurante/${restauranteTest._id}`)
        .send({
            name: 'Alo',
            category: 'Comida rápida',
            admin: '12345',
        });

        expect(response.status).toBe(401);
    });


});
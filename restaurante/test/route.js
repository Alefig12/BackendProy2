const supertest = require('supertest');
const restaurante = require('../restaurante.routes.js');

describe('Pruebas de rutas', () => {
    //success cases
    it('GET /:id debería devolver el restaurante con el ID correspondiente', async () => {
        const response = await supertest(restaurante).get('/restaurante/36'); 
        expect(response.status).toBe(200);
    });

    it('GET / debería devolver todos los restaurantes', async () => {
        const response = await supertest(restaurante).get('/restaurante'); 
        expect(response.status).toBe(200);
    });

    it('POST / debería crear un nuevo restaurante', async () => {
        const response = await supertest(restaurante)
        .post('/restaurante')
        .send({
            name: 'Alo1',
            category: 'Comida asiatica',
            admin: '12534',
        });

        expect(response.status).toBe(200);
    });

    it('PUT /:id debería actualizar un restaurante', async () => {
        const response = await supertest(restaurante)
        .put('/restaurante/36')
        .send({
            name: 'Alo1',
            category: 'Comida asiatica',
            admin: '12534',
        });

        expect(response.status).toBe(200);
    });

    it('DELETE /:id debería eliminar un restaurante', async () => {
        const response = await supertest(restaurante)
        .delete('/restaurante/36');

        expect(response.status).toBe(200);
    });

    //error cases
    it('GET /:id debería devolver un error 404 si el restaurante no existe', async () => {
        const response = await supertest(restaurante).get('/restaurante/36'); 
        expect(response.status).toBe(404);
    });

    it('GET / debería devolver un error 404 si no hay restaurantes', async () => {
        const response = await supertest(restaurante).get('/restaurante'); 
        expect(response.status).toBe(404);
    });

    it('POST / debería devolver un error 400 si no se envía el nombre del restaurante', async () => {
        const response = await supertest(restaurante)
        .post('/restaurante')
        .send({
            category: 'Comida asiatica',
            admin: '12534',
        });

        expect(response.status).toBe(400);
    });
});

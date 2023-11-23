const supertest = require('supertest');
const app = require('../producto.routes');

describe('Pruebas de rutas', () => {
    //success cases
  it('GET /:id debería devolver el producto con el ID correspondiente', async () => {
    const response = await supertest(app).get('/producto/36'); 
    expect(response.status).toBe(200);
  });

    it('GET / debería devolver todos los productos', async () => {
        const response = await supertest(app).get('/producto'); 
        expect(response.status).toBe(200);
    });

    it('POST / debería crear un nuevo producto', async () => {
        const response = await supertest(app)
            .post('/producto')
            .send({
                name: 'Hamburguesa',
                description: 'Hamburguesa con queso',
                category: 'Comida rápida',
                price: 10000,
                id_restaurant: '1234',
            });

        expect(response.status).toBe(201);
    });

    it('PUT /:id debería actualizar un producto existente', async () => {
        const response = await supertest(app)
            .put('/producto/36')
            .send({
                name: 'Hamburguesa',
                description: 'Hamburguesa con queso',
                category: 'Comida rápida',
                price: 10000,
                id_restaurant: '1234',
            });

        expect(response.status).toBe(200);
    });

    //error cases
    //No existe producto con el ID
    it('GET /:id debería devolver el producto con el ID correspondiente', async () => {
        const response = await supertest(app).get('/producto/5783');
        expect(response.status).toBe(404);
    });
    //no existen productos
    it('GET / debería devolver los productos', async () => {
        const response = await supertest(app).get('/producto');
        expect(response.status).toBe(404);
    });
    
    //Falta el nombre
    it('debería crear un producto', async () => {
        const response = await supertest(app)
            .post('/producto')
            .send({
                description: 'Hamburguesa con queso',
                category: 'Comida rápida',
                price: 10000,
                id_restaurant: '1234',
            });

        expect(response.status).toBe(500);
    });

});
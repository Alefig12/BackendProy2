const supertest = require('supertest');
const express = require('express');
const app = express();

const{
    getProductoById,
    getProductos,
    createProducto,
    updateProducto
} = require('../producto.controller.js');

const productoRoutes = require('../producto.routes.js');

app.use('/producto', productoRoutes);

describe('pruebas de integración productos', () => {
    it('GET / debería devolver todos los productos', async () => {
        const response = await supertest(app).get('/producto');
        expect(response.status).toBe(200);
    });

    it('GET /:id debería devolver el producto con el ID correspondiente', async () => {
        const response = await supertest(app).get('/producto/1');
        expect(response.status).toBe(200);
    });

    it('POST / debería crear un nuevo producto', async () => {
        const response = await supertest(app)
            .post('/producto')
            .send({
                name: 'test',
                description: 'test',
                category: 'test',
                price: 'test',
                id_restaurant: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(201);
    }
    );

    it('PUT /:id debería actualizar el producto con el ID correspondiente', async () => {
        const response = await supertest(app)
            .put('/producto/1')
            .send({
                name: 'test',
                description: 'test',
                category: 'test',
                price: 'test',
                id_restaurant: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(200);
    });

    //casos de error
    it('GET /:id debería devolver un error si no se envía el id del producto', async () => {
        const response = await supertest(app).get('/producto/');
        expect(response.status).toBe(404);
    });

    it('POST / debería devolver un error si no se envía el nombre del producto', async () => {
        const response = await supertest(app)
            .post('/producto')
            .send({
                description: 'test',
                category: 'test',
                price: 'test',
                id_restaurant: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(500);
    });


    it('PUT /:id debería devolver un error si no se envía el id del producto', async () => {
        const response = await supertest(app)
            .put('/producto/')
            .send({
                name: 'test',
                description: 'test',
                category: 'test',
                price: 'test',
                id_restaurant: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(404);
    });

    it('PUT /:id debería devolver un error si no se envía la descripción del producto', async () => {
        const response = await supertest(app)
            .put('/producto/1')
            .send({
                name: 'test',
                category: 'test',
                price: 'test',
                id_restaurant: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(500);
    }
    );


    it('GET /:id debería devolver un error si el producto no existe', async () => {
        const response = await supertest(app).get('/producto/0');
        expect(response.status).toBe(404);
    }
    );

    it('POST / debería devolver un error si el producto no existe', async () => {
        const response = await supertest(app)
            .post('/producto')
            .send({
                name: 'test',
                description: 'test',
                category: 'test',
                price: 'test',
                id_restaurant: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(500);
    }
    );



});
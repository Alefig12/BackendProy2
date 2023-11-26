const supertest = require('supertest');
const express = require('express');
const app = express();

const{
    getPedidoById,
    getPedidos,
    getPedidosSinAceptar,
    createPedido,
    updatePedido
} = require('../pedido.controller.js');
const pedidoRoutes = require('../pedido.routes.js');

app.use('/pedido', pedidoRoutes);

describe('pruebas de integración pedidos', () => {
    it('GET / debería devolver todos los pedidos', async () => {
        const response = await supertest(app).get('/pedido');
        expect(response.status).toBe(200);
    });

    it('GET /:id debería devolver el pedido con el ID correspondiente', async () => {
        const response = await supertest(app).get('/pedido/1');
        expect(response.status).toBe(200);
    });

    it('POST / debería crear un nuevo pedido', async () => {
        const response = await supertest(app)
            .post('/pedido')
            .send({
                id_user: 'test',
                id_restaurant: 'test',
                products: 'test',
                total: 'test',
                status: 'test',
                date: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(201);
    }
    );

    it('PUT /:id debería actualizar el pedido con el ID correspondiente', async () => {
        const response = await supertest(app)
            .put('/pedido/1')
            .send({
                id_user: 'test',
                id_restaurant: 'test',
                products: 'test',
                total: 'test',
                status: 'test',
                date: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(200);
    });

    it('DELETE /:id debería eliminar el pedido con el ID correspondiente', async () => {
        const response = await supertest(app).delete('/pedido/1');
        expect(response.status).toBe(200);
    });

    it('GET /sinaceptar debería devolver todos los pedidos sin aceptar', async () => {
        const response = await supertest(app).get('/pedido/sinaceptar');
        expect(response.status).toBe(200);
    });

    //casos de error
    it('GET /:id debería devolver un error si no se envía el id del pedido', async () => {
        const response = await supertest(app).get('/pedido/');
        expect(response.status).toBe(404);
    });

    it('POST / debería devolver un error si no se envía el id del usuario', async () => {
        const response = await supertest(app)
            .post('/pedido')
            .send({
                id_restaurant: 'test',
                products: 'test',
                total: 'test',
                status: 'test',
                date: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(500);
    });

    it('PUT /:id debería devolver un error si no se envía el id del pedido', async () => {
        const response = await supertest(app)
            .put('/pedido/1')
            .send({
                id_restaurant: 'test',
                products: 'test',
                total: 'test',
                status: 'test',
                date: 'test',
                isDeleted: false,
            });
        expect(response.status).toBe(500);
    });

    it('DELETE /:id debería devolver un error si no se envía el id del pedido', async () => {
        const response = await supertest(app).delete('/pedido/');
        expect(response.status).toBe(404);
    });

    it('GET /sinaceptar debería devolver un error si no se envía el id del pedido', async () => {
        const response = await supertest(app).get('/pedido/sinaceptar/');
        expect(response.status).toBe(404);
    });

});
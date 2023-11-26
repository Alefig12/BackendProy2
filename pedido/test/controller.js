const supertest = require('supertest');
const app = require('../pedido.routes.js');
const pedido = require('../pedido.model.js');

describe('Controlador de Pedido', () => {
    it('Debería obtener un pedido por ID', async () => {
        const pedidoTest = new pedido({
        id_user: '1234',
        id_restaurant: '1234',
        id_product: '1234',
        quantity: 1,
        total: 10000,
        status: 'Pendiente',
        date: '2021-10-10',
        isDeleted: false,
        });
        await pedidoTest.save();
    
        const response = await supertest(app).get(`/pedido/${pedidoTest._id}`);

        expect(response.status).toBe(200);

    });
    
    it('Debería obtener todos los pedidos', async () => {
        const pedidoTest = new pedido({
        id_user: '1234',
        id_restaurant: '1234',
        id_product: '1234',
        quantity: 1,
        total: 10000,
        status: 'Pendiente',
        date: '2021-10-10',
        isDeleted: false,
        });

        const pedidoTest2 = new pedido({
        id_user: '1234',
        id_restaurant: '1234',
        id_product: '1234',
        quantity: 1,
        total: 10000,
        status: 'Pendiente',
        date: '2021-10-10',
        isDeleted: false,
        });
        await pedidoTest.save();
        await pedidoTest2.save();

        const response = await supertest(app).get('/pedido');

        expect(response.status).toBe(200);

    });
    
    it('Debería crear un pedido', async () => {
        const response = await supertest(app)
        .post('/pedido')
        .send({
            id_user: '1234',
            id_restaurant: '1234',
            id_product: '1234',
            quantity: 1,
            total: 10000,
            status: 'Pendiente',
            date: '2021-10-10',
            isDeleted: false,
        });
    
        expect(response.status).toBe(200);

    }
    );


    it('Debería actualizar un pedido', async () => {
        const pedidoTest = new pedido({
        id_user: '1234',
        id_restaurant: '1234',
        id_product: '1234',
        quantity: 1,
        total: 10000,
        status: 'Pendiente',
        date: '2021-10-10',
        isDeleted: false,
        });
        await pedidoTest.save();
    
        const response = await supertest(app)
        .put(`/pedido/${pedidoTest._id}`)
        .send({
            id_user: '1234',
            id_restaurant: '1234',
            id_product: '1234',
            quantity: 2,
            total: 20000,
            status: 'Aceptado',
            date: '2021-10-11',
            isDeleted: false,
        });
    
        expect(response.status).toBe(200);

    });

    it('Debería eliminar un pedido', async () => {
        const pedidoTest = new pedido({
        id_user: '1234',
        id_restaurant: '1234',
        id_product: '1234',
        id_address: '1234',
        price: 10000,
        status: 'Pendiente',
        });
        await pedidoTest.save();
    
        const response = await supertest(app)
        .delete(`/pedido/${pedidoTest._id}`);
    
        expect(response.status).toBe(200);
    });

    //not sucess cases
    it('No debería obtener un pedido por un ID inexistente', async () => {
        const response = await supertest(app).get(`/pedido/id-inexistente`);
    
        expect(response.status).toBe(404);
    });

    it('No debería crear un pedido sin id_user', async () => {
        const response = await supertest(app)
        .post('/pedido')
        .send({
            id_restaurant: '1234',
            id_product: '1234',
            quantity: 1,
            total: 10000,
            status: 'Pendiente',
            date: '2021-10-10',
            isDeleted: false,
        });
    
        expect(response.status).toBe(400);
    });

    it('No debería actualizar un pedido con un ID inexistente', async () => {
        const response = await supertest(app)
        .put(`/pedido/id-inexistente`)
        .send({
            id_user: '1234',
            id_restaurant: '1234',
            id_product: '1234',
            quantity: 2,
            total: 20000,
            status: 'Aceptado',
            date: '2021-10-11',
            isDeleted: false,
        });
    
        expect(response.status).toBe(404);
    });

});
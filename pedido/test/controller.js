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
        expect(response.body.id_user).toBe(pedidoTest.id_user);
        expect(response.body.id_restaurant).toBe(pedidoTest.id_restaurant);
        expect(response.body.id_product).toBe(pedidoTest.id_product);
        expect(response.body.quantity).toBe(pedidoTest.quantity);
        expect(response.body.total).toBe(pedidoTest.total);
        expect(response.body.status).toBe(pedidoTest.status);
        expect(response.body.date).toBe(pedidoTest.date);
        expect(response.body.isDeleted).toBe(pedidoTest.isDeleted);
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
        expect(response.body.length).toBe(2);
        expect(response.body[0].id_user).toBe(pedidoTest.id_user);
        expect(response.body[0].id_restaurant).toBe(pedidoTest.id_restaurant);
        expect(response.body[0].id_product).toBe(pedidoTest.id_product);
        expect(response.body[0].quantity).toBe(pedidoTest.quantity);
        expect(response.body[0].total).toBe(pedidoTest.total);
        expect(response.body[0].status).toBe(pedidoTest.status);
        expect(response.body[0].date).toBe(pedidoTest.date);
        expect(response.body[0].isDeleted).toBe(pedidoTest.isDeleted);
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
    
        expect(response.status).toBe(201);
        expect(response.body.id_user).toBe('1234');
        expect(response.body.id_restaurant).toBe('1234');
        expect(response.body.id_product).toBe('1234');
        expect(response.body.quantity).toBe(1);
        expect(response.body.total).toBe(10000);
        expect(response.body.status).toBe('Pendiente');
        expect(response.body.date).toBe('2021-10-10');
        expect(response.body.isDeleted).toBe(false);
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
        expect(response.body.id_user).toBe(pedidoTest._id.toString());
        expect(response.body.id_restaurant).toBe(pedidoTest.id_restaurant);
        expect(response.body.id_product).toBe(pedidoTest.id_product);
        expect(response.body.quantity).not.toBe(pedidoTest.quantity);
        expect(response.body.total).not.toBe(pedidoTest.total);
        expect(response.body.status).not.toBe(pedidoTest.status);
        expect(response.body.date).not.toBe(pedidoTest.date);
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
    
        expect(response.status).toBe(204);
    });

    //not sucess cases
    it('No debería obtener un pedido por un ID inexistente', async () => {
        const response = await supertest(app).get(`/pedido/id-inexistente`);
    
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Pedido not found');
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
        expect(response.body.message).toBe('User required');
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
        expect(response.body.message).toBe('Pedido not found');
    });

});
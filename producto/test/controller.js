const supertest = require('supertest');
const app = require('../../producto.controller.js');
const restaurante = require('../producto.model.js');

describe('Controlador de Producto', () => {
    it('Debería obtener un producto por ID', async () => {
        const productoTest = new producto({
            name: 'Hamburguesa',
            description: 'Hamburguesa con queso',
            category: 'Comida rápida',
            price: 20000,
            id_restaurant: '1234',
        });
        await productoTest.save();

        const response = await supertest(app)
            .get(`/producto/${productoTest._id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(productoTest.name);
        expect(response.body.description).toBe(productoTest.description);
        expect(response.body.category).toBe(productoTest.category);
        expect(response.body.price).toBe(productoTest.price);
        expect(response.body.id_restaurant).toBe(productoTest.id_restaurant);
    });

    // Prueba para getProductos
    it('Debería obtener todos los productos', async () => {
        const productoTest = new producto({
            name: 'Hamburguesa',
            description: 'Hamburguesa con queso',
            category: 'Comida rápida',
            price: 20000,
            id_restaurant: '1234',
        });
        await productoTest.save();
        const response = await supertest(app)
            .get('/producto');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    // Prueba para createProducto
    it('Debería crear un producto', async () => {
        const response = await supertest(app)
            .post('/producto')
            .send({
                name: 'Perro caliente',
                description: 'Perro caliente con tocineta',
                category: 'Comida rápida',
                price: 10000,
                id_restaurant: '1234',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

    // Prueba para updateProducto
    it('Debería actualizar un producto', async () => {
        const productoTest = new producto({
            name: 'Hamburguesa',
            description: 'Hamburguesa con queso',
            category: 'Comida rápida',
            price: 20000,
            id_restaurant: '1234',
        });
        await productoTest.save();

        const response = await supertest(app)
            .put(`/producto/${productoTest._id}`)
            .send({
                name: 'Hamburguesa',
                description: 'Hamburguesa con queso',
                category: 'Comida rápida',
                price: 10000,
                id_restaurant: '1234',
            });

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(productoTest._id.toString());
        expect(response.body.name).not.toBe(productoTest.name);
        expect(response.body.description).not.toBe(productoTest.description);
        expect(response.body.category).not.toBe(productoTest.category);
        expect(response.body.price).not.toBe(productoTest.price);
        expect(response.body.id_restaurant).not.toBe(productoTest.id_restaurant);
    });

    //error cases
    it('No debería obter un producto con un ID inexistente', async () => {
        const response = await supertest(app).get('/producto/386');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Producto no encontrado');
    });

    it('No debería obtener productos si no hay ninguno', async () => {
        const response = await supertest(app).get('/producto');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No hay productos');
    });

    it('No debería actualizar un producto inexistente', async () => {
        const response = await supertest(app)
            .put('/producto/386')
            .send({
                name: 'Arroz',
                description: 'Arroz con pollo',
                category: 'Almuerzo',
                price: 12000,
                id_restaurant: '12834',
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Producto no encontrado');
    });


    it('No debería crear un producto sin IDRestaurante', async () => {
        const response = await supertest(app)
            .post('/producto')
            .send({
                name: 'Hamburguesa',
                description: 'Hamburguesa con queso',
                category: 'Comida rápida',
                price: 10000,
            });

        expect(response.status).toBe(400);
    });
  
});




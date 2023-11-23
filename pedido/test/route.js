const supertest = require('supertest');
const app = require('../pedido.routes.js');

describe('Pruebas de ruta', () => {
    //success cases
  it('GET /:id debería devolver el pedido con el ID correspondiente', async () => {
    const response = await supertest(app).get('/pedido/32'); 
    expect(response.status).toBe(200);
  });

  it('GET /sinaceptar debería devolver todos los pedidos sin aceptar', async () => {
    const response = await supertest(app).get('/pedido/sinaceptar'); 
    expect(response.status).toBe(200);
  });

  it('POST / debería crear un nuevo pedido', async () => {
    const response = await supertest(app)
      .post('/pedido')
      .send({
        id_user: '3',
        id_restaurant: '3',
        id_product: '3',
        quantity: 1,
        total: 10000,
        status: 'Pendiente',
        date: '2021-10-10',
        isDeleted: false,
      });

    expect(response.status).toBe(201);
  });

  it('PUT /:id debería actualizar el pedido con el ID correspondiente', async () => {
    const response = await supertest(app)
      .put('/pedido/3')
      .send({
        id_user: '3',
        id_restaurant: '3',
        id_product: '3',
        quantity: 1,
        total: 10000,
        status: 'Pendiente',
        date: '2021-10-10',
        isDeleted: false,
      });

    expect(response.status).toBe(200);
  });

  //fail cases
  it('GET /:id debería el pedido con el ID correspondiente', async () => {
    const response = await supertest(app).get('/pedido/0'); 
    expect(response.status).toBe(500);
  });

  it('GET /sinaceptar debería regresar los pedidos sin aceptar', async () => {
    const response = await supertest(app).get('/pedido/sinaceptar'); 
    expect(response.status).toBe(404);
  });

  it('POST / debería debería crear un pedido', async () => {
    const response = await supertest(app)
      .post('/pedido')
      .send({
        id_user: '3',
        quantity: 1,
        total: 10000,
        status: 'Pendiente',
        isDeleted: false,
      });

    expect(response.status).toBe(500);
      });

    it('PUT /:id debería actualizar el pedido con el ID correspondiente', async () => {
        const response = await supertest(app)
          .put('/pedido/3')
          .send({
            id_user: '3',
            id_restaurant: '3',
            id_product: '3',
            quantity: 1,
            total: 10000,
            status: 'Aceptado',
            date: '2021-10-10',
            isDeleted: false,
          });
    
        expect(response.status).toBe(500);
      });

});
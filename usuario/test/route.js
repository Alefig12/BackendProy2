const supertest = require('supertest');
const app = require('../usuario.routes');


describe('Pruebas de rutas', () => {
    //success cases
  it('GET /:id debería devolver el usuario con el ID correspondiente', async () => {
    const response = await supertest(app).get('/user/3'); 
    expect(response.status).toBe(200);
  });

  it('GET /twofa/:id debería devolver el código QR para la autenticación de dos factores', async () => {
    const response = await supertest(app).get('/user/twofa/3'); 
    expect(response.status).toBe(200);
  });

  it('POST /login debería autenticar al usuario y devolver un token', async () => {
    const response = await supertest(app)
      .post('/user/login')
      .send({
        email: 'vmhernandez@uninorte.edu.co',
        password: 'patomar',
        tfactor: '65478'
      });

    expect(response.status).toBe(200);
  });

  it('POST /register debería registrar un nuevo usuario', async () => {
    const response = await supertest(app)
      .post('/user/register')
      .send({
        name: 'Santiago',
        lastName: 'Pitalito',
        email: 'santpi@gmail.com',
        password: 'contraseñaSegura123',
        phoneNo: '1234567890',
        address: 'calle 3. #a-2',
        isAdmin: false
      });

    expect(response.status).toBe(201);
  });

  it('POST /register debería registrar un nuevo usuario', async () => {
    const response = await supertest(app)
      .post('/user/register')
      .send({
        name: 'Alex',
        lastName: 'Ochoa',
        email: 'Alex8a@gmail.com',
        password: 'muchos8a',
        phoneNo: '88888888',
        address: 'calle 8. #o-8',
        isAdmin: true
      });

    expect(response.status).toBe(201);
  });

  it('PUT /:id debería actualizar la información del usuario', async () => {
    const response = await supertest(app)
      .put('/user/4') 
      .send({
        name: 'Santiago',
        lastName: 'Pitalito',
        email: 'santpi@gmail.com',
        password: 'contraseñaNOSegura123',
        phoneNo: '1234567890',
        address: 'calle 3. #a-2',
        isAdmin: false
      });

    expect(response.status).toBe(200);
  });

  
  //notsucesscases
  //No envía un número como id
  it('GET /:id debería devolver el usuario con el ID correspondiente', async () => {
    const response = await supertest(app).get('/user/a'); 
    expect(response.status).toBe(500);
  });

  //No envía un número como id
  it('GET /twofa/:id debería devolver el código QR para la autenticación de dos factores', async () => {
    const response = await supertest(app).get('/user/twofa/a'); 
    expect(response.status).toBe(500);
  });

  //No envía parámetros completos (falta password)
  it('POST /login debería autenticar al usuario y devolver un token', async () => {
    const response = await supertest(app)
      .post('/user/login')
      .send({
        email: 'vmhernandez@uninorte.edu.co',
        tfactor: '65478'
      });

    expect(response.status).toBe(500);
  });

  //Le faltan parámetros a ospitalito
  it('POST /register debería registrar un nuevo usuario', async () => {
    const response = await supertest(app)
      .post('/user/register')
      .send({
        name: 'os',
        lastName: 'Pitalito',
        password: 'contraseñaSegura123',
        phoneNo: '1234567890',
        address: 'calle 3. #a-2'
      });

    expect(response.status).toBe(500);
  });

//Faltan parámetros
  it('PUT /:id debería actualizar la información del usuario', async () => {
    const response = await supertest(app)
      .put('/user/4') 
      .send({
        name: 'Dorothea',
        lastName: 'Escaporra',
        phoneNo: '12312312',
        address: 'calle 3. #a-2',
        isAdmin: false
      });

    expect(response.status).toBe(500);
  });
});
const supertest = require('supertest');
const app = require('../usuario.controller.js'); 
const usuario = require('../usuario.model.js'); 

describe('Controlador de Usuario', () => {
  it('Debería obtener un usuario por ID', async () => {
    const userTest = new usuario({
        name: 'Santiago',
        lastName: 'Pitalito',
        email: 'santpi@gmail.com',
        password: 'contraseñaSegura123',
        phoneNo: '1234567890',
        address: 'calle 3. #a-2',
        isAdmin: false
    });
    await userTest.save();

    const response = await supertest(app).get(`/user/${userTest._id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userTest.name);
    expect(response.body.lastName).toBe(userTest.lastName);
    expect(response.body.email).toBe(userTest.email);
    expect(response.body.password).toBe(userTest.password);
    expect(response.body.phoneNo).toBe(userTest.phoneNo);
    expect(response.body.address).toBe(userTest.address);
    expect(response.body.isAdmin).toBe(userTest.isAdmin);
  });

  // Prueba para getTwoFactorQR
  it('Debería obtener el código QR para la autenticación de dos factores', async () => {
    const userTest = new usuario({
        name: 'Santiago',
        lastName: 'Pitalito',
        email: 'santpi@gmail.com',
        password: 'contraseñaSegura123',
        phoneNo: '1234567890',
        address: 'calle 3. #a-2',
        isAdmin: false
    });
    await userTest.save();

    const response = await supertest(app).get(`/user/twofa/${userTest._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('twofa');
    expect(response.body.twofa).toHaveProperty('qr');
  });

  // Prueba para loginUser
  it('Debería autenticar al usuario y devolver un token', async () => {
    const userTest = new usuario({
        name: 'Santiago',
        lastName: 'Pitalito',
        email: 'santpi@gmail.com',
        password: 'contraseñaSegura123',
        phoneNo: '1234567890',
        address: 'calle 3. #a-2',
        isAdmin: false
    });
    await userTest.save();

    const response = await supertest(app)
      .post('/user/login')
      .send({
        email: 'santpi@gmail.com',
        password: 'contraseñaSegura123',
        tfactor: '435678', 
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('jwt');
  });

  // Prueba para createUser
  it('Debería crear un nuevo usuario', async () => {
    const response = await supertest(app)
      .post('/user/register')
      .send({
        name: 'Camila',
        lastName: 'González',
        email: 'camila.gonzalez@example.com',
        password: 'OtraContraseñaSegura456',
        phoneNo: '9876543210',
        address: 'Av. Principal 123',
        isAdmin: true
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
  });

  // Prueba para putUser
  it('Debería actualizar la información del usuario', async () => {
    const userTest = new usuario({
        name: 'Camila',
        lastName: 'Cabello',
        email: 'camila.ca@example.com',
        password: 'OtraContraseñaSegura456',
        phoneNo: '9876543210',
        address: 'Av. Principal 123',
        isAdmin: true
    });
    await userTest.save();

    const response = await supertest(app)
      .put(`/user/${userTest._id}`)
      .send({
        name: 'Camila',
        lastName: 'Caballo',
        email: 'camila.caballoYIHA@example.com',
        password: 'OtraContraseñaSegura456',
        phoneNo: '9876543210',
        address: 'Texas',
        isAdmin: true
      });

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(userTest._id.toString());
    expect(response.body.lastName).not.toBe(userTest.lastName);
    expect(response.body.email).not.toBe(userTest.email);
    expect(response.body.address).not.toBe(userTest.address);
  });

  //not success cases
  it('No debería obtener un usuario por un ID inexistente', async () => {
    const response = await supertest(app).get(`/user/id-inexistente`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('No debería obtener el código QR para un usuario inexistente', async () => {
    const response = await supertest(app).get(`/user/twofa/id-inexistente`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('No debería autenticar al usuario con credenciales incorrectas', async () => {
    const response = await supertest(app)
      .post('/user/login')
      .send({
        email: 'usuario-inexistente@example.com',
        password: 'contraseñaIncorrecta',
        tfactor: 'codigoIncorrecto',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('No debería actualizar la información de un usuario inexistente', async () => {
    const response = await supertest(app)
      .put(`/user/id-inexistente`)
      .send({
        name: 'NoExiste',
        lastName: 'NoExiste',
        email: 'NoExiste@quetriste.com',
        password: 'NoExiste456',
        phoneNo: '0000000000',
        address: 'NoExiste',
        isAdmin: true
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });

});

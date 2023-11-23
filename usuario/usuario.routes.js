import { Router } from 'express';
import { getUserById, loginUser, createUser, putUser } from './usuario.controller.js';
const router = Router();

// Endpoint GET user by id
router.get('/:id', getUserById);

// Endpoint POST login user (get user by credentials)
router.post('/login', loginUser);

//Endpoint POST register user
router.post('/register', createUser);

// Endpoint PUT user
router.put('/:id', putUser);

export default router;

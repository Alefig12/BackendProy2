import {
	getProductoById,
	getProductos,
	createProducto,
	updateProducto,
} from './producto.controller.js';
import { Router } from 'express';
const router = Router();

// Endpoint GET product by id
router.get('/:id', getProductoById);

// Endpoint GET products
router.get('/', getProductos);

// Endpoint POST product
router.post('/', createProducto);

// Endpoint PUT product
router.put('/:id', updateProducto);

export default router;

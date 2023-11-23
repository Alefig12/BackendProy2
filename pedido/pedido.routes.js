import {
	getPedidoById,
	getPedidos,
	getPedidosSinAceptar,
	createPedido,
	updatePedido,
} from './pedido.controller.js';
import { Router } from 'express';
const router = Router();

// Endpoint GET order by id
router.get('/:id', getPedidoById);

// Endpoint GET orders
router.get('/', getPedidos);

// Endpoint GET orders sin aceptar
router.get('/sinaceptar', getPedidosSinAceptar);

// Endpoint POST order
router.post('/', createPedido);

// Endpoint PUT order
router.put('/:id', updatePedido);

export default router;

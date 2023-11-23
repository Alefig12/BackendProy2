import {
	getRestaurantById,
	getRestaurants,
	createRestaurant,
	updateRestaurant,
} from './restaurante.controller.js';
import { Router } from 'express';
const router = Router();

// Endpoint GET restaurant by id
router.get('/:id', getRestaurantById);

// Endpoint GET restaurants
router.get('/', getRestaurants);

// Endpoint POST restaurant
router.post('/', createRestaurant);

// Endpoint PUT restaurant
router.put('/:id', updateRestaurant);

export default router;

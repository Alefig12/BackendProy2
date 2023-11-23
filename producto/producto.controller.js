import producto from './producto.model.js';
import restaurante from './restaurante.model.js';


export async function getProductoById(req, res) {
	const { id } = req.params;
	const product = await producto.findById(id);
	if (!product || product.isDeleted) {
		res.status(404).json({ message: 'Product not found' });
		return;
	}
	res.status(200).json(product);
}

export async function getProductos(req, res) {
	const { id_restaurant, category } = req.query;
	const query = {
		isDeleted: false,
	};
	if (id_restaurant) {
		query.id_restaurant = id_restaurant;
	}
	if (category) {
		query.category = category;
	}
	const products = await producto.find(query);

	if (!products) {
		res.status(404).json({ message: 'Products not found' });
		return;
	}
	res.status(200).json(products);
}

export async function createProducto(req, res) {
	try {
		const { name, description, category, price, id_restaurant } = req.body;
		const product = new producto({ name, description, category, price, id_restaurant });
	
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const tokenUserID = decoded._id;

		const restaurant = await restaurante.findById(id_restaurant);
		const restaurantAdmin = restaurant.admin;
		if (tokenUserID != restaurantAdmin) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const result = await product.save();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function updateProducto(req, res) {
	try {
		const { id } = req.params;
		const { name, description, category, price, id_restaurant, isDeleted } = req.body;
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const tokenUserID = decoded._id;

		const restaurant = await restaurante.findById(id_restaurant);
		const restaurantAdmin = restaurant.admin;
		if (tokenUserID != restaurantAdmin) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const product = await producto.findById(id);
		if (!product || product.isDeleted) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		product.name = name;
		product.description = description;
		product.category = category;
		product.price = price;
		product.id_restaurant = id_restaurant;
		product.isDeleted = isDeleted;
		const result = await product.save();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
}

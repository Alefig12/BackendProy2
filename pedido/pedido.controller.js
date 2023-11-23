import pedido from './pedido.model.js';

export async function getPedidoById(req, res) {
	const { id } = req.params;
	const order = await pedido.findById(id);
	if (!order || order.isDeleted) {
		res.status(404).json({ message: 'Order not found' });
		return;
	}
	res.status(200).json(order);
}

export async function getPedidos(req, res) {
	const { id_user, id_restaurant, initialDate, finalDate, status } = req.query;
	const query = {
		isDeleted: false,
	};
	if (id_user) {
		query.id_user = id_user;
	}
	if (id_restaurant) {
		query.id_restaurant = id_restaurant;
	}
	if (initialDate && finalDate) {
		query.date = { $gte: initialDate, $lte: finalDate };
	}
	if (status) {
		query.status = status;
	}

	const orders = await pedido.find(query);

	if (!orders) {
		res.status(404).json({ message: 'Orders not found' });
		return;
	}

	res.status(200).json(orders);
}

export async function getPedidosSinAceptar(req, res) {
	const query = {
		isDeleted: false,
		status: 'Creado',
	};

	const orders = await pedido.find(query);

	if (!orders) {
		res.status(404).json({ message: 'Orders not found' });
		return;
	}

	res.status(200).json(orders);
}

export async function createPedido(req, res) {
	try {
		const { id_user, id_restaurant, products, total, status, date } = req.body;
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const tokenUserID = decoded._id;
		if (tokenUserID != id_user) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const order = new pedido({ id_user, id_restaurant, products, total, status, date });
		const result = await order.save();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function updatePedido(req, res) {
	try {
		const { id } = req.params;
		const { id_user, id_restaurant, products, total, status, date, isDeleted } = req.body;
		const order = await pedido.findById(id);
		if (!order || order.isDeleted) {
			res.status(404).json({ message: 'Order not found' });
			return;
		}
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const tokenUserID = decoded._id;
		if (tokenUserID != id_user) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		order.id_user = id_user;
		order.id_restaurant = id_restaurant;
		order.products = products;
		order.total = total;
		order.status = status;
		order.date = date;
		order.isDeleted = isDeleted;
		const result = await order.save();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
}

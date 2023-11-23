import mongoose from 'mongoose';

const pedidoSchema = mongoose.Schema({
	id_user: { type: String, required: [true, 'User required'] },
	id_restaurant: { type: String, required: [true, 'Restaurant required'] },
	products: {
		type: [
			{
				id_product: { type: String, required: [true, 'Product required'] },
				quantity: { type: Number, required: [true, 'Quantity required'] },
			},
		],
		required: [true, 'Products required'],
	},
	total: { type: Number, required: [true, 'Price required'] },
	status: { type: String, required: [true, 'Status required'] },
	date: { type: Date, required: [true, 'Date required'] },
	isDeleted: { type: Boolean, default: false },
});

export default mongoose.model('pedido', pedidoSchema);

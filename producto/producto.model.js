import mongoose from 'mongoose';

const productoSchema = mongoose.Schema({
	name: { type: String, required: [true, 'Name required'] },
	description: { type: String, required: [true, 'Description required'] },
	category: { type: String, required: [true, 'Category required'] },
	price: { type: Number, required: [true, 'Price required'] },
	id_restaurant: { type: String, required: [true, 'Restaurant required'] },
	isDeleted: { type: Boolean, default: false },
});

export default mongoose.model('producto', productoSchema);

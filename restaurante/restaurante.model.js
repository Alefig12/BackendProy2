import mongoose from 'mongoose';

const restauranteSchema = mongoose.Schema({
	name: { type: String, required: [true, 'Name required'] },
	address: { type: String, required: [true, 'Address required'] },
	category: { type: String, required: [true, 'Category required'] },
	admin: { type: String, required: [true, 'Admin required'] },
	isDeleted: { type: Boolean, default: false },
});

export default mongoose.model('restaurante', restauranteSchema);

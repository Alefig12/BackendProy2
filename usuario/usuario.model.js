import mongoose from 'mongoose';

const usuarioSchema = mongoose.Schema({
	name: { type: String, required: [true, 'Name required'] },
	lastName: { type: String, required: false },
	email: { type: String, required: [true, 'Email required'] },
	password: { type: String, required: [true, 'Password required'] },
	phoneNo: { type: String, required: [true, 'Phone number required'] },
	address: { type: String, required: [true, 'Address required'] },
	isAdmin: { type: Boolean, required: [true, 'Type of user required'] },
	jwt: { type: String, required: false, default: '' },
	isDeleted: { type: Boolean, default: false },

});

export default mongoose.model('usuario', usuarioSchema);

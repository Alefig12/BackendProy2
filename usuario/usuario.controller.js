import usuario from './usuario.model.js';
const jwt = require('jsonwebtoken');
const twofactor = require('node-2fa');



export async function getUserById(req, res) {
	const { id } = req.params;
	const user = await usuario.findById(id);
	if (!user || user.isDeleted) {
		res.status(404).json({ message: 'User not found' });
		return;
	}
	res.status(200).json(user);
}

export async function getTwoFactorQR(req, res) {
	const { id } = req.params;
	const user = await usuario.findById(id);
	if (!user || user.isDeleted) {
		res.status(404).json({ message: 'User not found' });
		return;
	}
	res.status(200).json(user.twofa.qr);
}

export async function loginUser(req, res) {
	const { email, password, tfactor } = req.body;
	const hashedPassword= await hashedPassword (password);
	const user = await usuario.findOne({ email, password:hashedPassword});
	if (!user || user.isDeleted) {
		res.status(404).json({ message: 'User not found' });
		return;
	}

	if (user.isAdmin) {
		
		const resp = twofactor.verifyToken(user.twofa.secret, tfactor);
		if (!resp || !resp.delta) {
			res.status(401).json({ message: 'Invalid token' });
			return;
		}
	}

	var payload = {
		_id: user._id,
		email: user.email,
		isAdmin: user.isAdmin,

	}
	const token = jwt.sign(payload, process.env.TOKEN_SECRET);
	user.jwt = token;
	await user.save();
	res.status(200).json(user);
}

export async function createUser(req, res) {
	try {
		const { name, lastName, email, password, phoneNo, address, isAdmin } = req.body;
		const hashedPassword = await hashedPassword(password);
		const user = new usuario({ name, lastName, email, password:hashedPassword, phoneNo, address, isAdmin });

		if (isAdmin) {
			const secret = twofactor.generateSecret({ name: 'RappiMocho', account: email });
			user.twofa = {
				secret: secret.secret,
				uri: secret.uri,
				qr: secret.qr,
			};


		}

		const result = await user.save();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function putUser(req, res) {
	try {
		const { name, lastName, email, password, phoneNo, address, isAdmin, isDeleted } = req.body;
	
		const token = req.headers.authorization.split(' ')[1];
	
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		
		const tokenUserID = decoded._id;
		
		const userId = req.params.id;

		if (tokenUserID != userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		//also works as "Delete" if you send isDeleted: true
		const user = await usuario.findById(userId);

		if (!user || user.isDeleted) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		const updatedUser = await usuario.findByIdAndUpdate(userId, {
			name,
			lastName,
			email,
			password,
			phoneNo,
			address,
			isAdmin,
			isDeleted,
		});

		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
}

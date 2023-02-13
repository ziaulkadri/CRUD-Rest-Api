const User = require('../models/user');

//CRUD Controllers

// get all users

exports.getUsers = (req, res, next) => {
	User.findAll()
		.then((users) => {
			res.status(200).json({ users: users });
		})
		.catch((err) => console.log(err));
};

//get user by id

exports.getUser = (req, res, next) => {
	const Id = req.params.userId;
	User.findByPk(Id)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.status(200).json({ user: user });
		})
		.catch((err) => console.log(err));
};

//create a new user

exports.createUser = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;

	User.create({
		name: name,
		email: email,
	})
		.then((result) => {
			console.log('user created');
			res.status(201).json({
				message: 'User created successfully',
				user: result,
			});
		})
		.catch((err) => console.log(err));
};

//update a user

exports.updateUser = (req, res, next) => {
	const userId = req.body.userId;
	const updateName = req.body.name;
	const updateEmail = req.body.email;

	User.findByPk(userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			user.name = updateName;
			user.email = updateEmail;
			return user.save();
		})
		.then((result) => {
			res.status(200).json({ message: 'user updated successfully' });
		})
		.catch((err) => console.log(err));
};

//delete a user

exports.deleteUser = (req, res, next) => {
	const userId = req.params.UserId;
	User.findByPk(userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			return User.destroy({
				Where: {
					id: userId,
				},
			});
		})
		.then((result) => {
			res.status(200).json({ message: 'User deleted' });
		})
		.catch((err) => console.log(err));
};

const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	console.log(req.body);
	if (!req.body) {
		return res.status(400).send({
			message: 'User can not be empty ' + JSON.stringify(req.body),
		});
	}

	// Create a User
	const user = new User({
		name: req.body.name || 'No Name',
		email: req.body.email,
		phoneNo: req.body.phoneNo,
		ticketNo: req.body.ticketNo,
	});

	// Save User in the database
	user
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the User.',
			});
		});
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
	User.find()
		.then((users) => {
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Users.',
			});
		});
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
	User.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User not found with id ' + req.params.userId,
				});
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'User not found with id ' + req.params.userId,
				});
			}
			return res.status(500).send({
				message: 'Error retrieving note with id ' + req.params.userId,
			});
		});
};

// Update a note identified by the userId in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body.content) {
		return res.status(400).send({
			message: 'User content can not be empty',
		});
	}

	// Find note and update it with the request body
	User.findByIdAndUpdate(
		req.params.userId,
		{
			title: req.body.title || 'Untitled User',
			content: req.body.content,
		},
		{ new: true }
	)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User not found with id ' + req.params.userId,
				});
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'User not found with id ' + req.params.userId,
				});
			}
			return res.status(500).send({
				message: 'Error updating note with id ' + req.params.userId,
			});
		});
};

// Delete a note with the specified userId in the request
exports.delete = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then((note) => {
			if (!note) {
				return res.status(404).send({
					message: 'User not found with id ' + req.params.userId,
				});
			}
			res.send({ message: 'User deleted successfully!' });
		})
		.catch((err) => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: 'User not found with id ' + req.params.userId,
				});
			}
			return res.status(500).send({
				message: 'Could not delete note with id ' + req.params.userId,
			});
		});
};

exports.findUserByPhoneNo = (req, res) => {

    const phoneNo = req.params.phoneNo;
	User.findOne({phoneNo: phoneNo})
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: 'User not found with phone ' + req.params.phoneNo,
				});
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'User not found with phone number ' + req.params.phoneNo,
				});
			}
			return res.status(500).send({
				message: 'Error retrieving note with phone number ' + req.params.userId,
			});
		});
};

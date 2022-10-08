module.exports = (app) => {
    const users = require('../controllers/users.controller.js');
    // Creating new user
    app.post('/users', users.create);

    // Getting all users
    app.get('/users', users.findAll);

    // Getting user by id
    app.get('/users/:userId', users.findOne);

    // Getting user by phone number
    app.get('/users-by-phone/:phoneNo', users.findUserByPhoneNo);

    // Updating user by id
    app.put('/users/:userId', users.update);

    // Deleting user by id
    app.delete('/users/:userId', users.delete);
}

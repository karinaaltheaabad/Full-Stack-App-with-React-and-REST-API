var express = require('express');
let { User } = require('../models');
var router = express.Router();
let { asyncHandler } = require('../middleware/async-handler');
let { authenticateUser } = require('../middleware/auth-user');

router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    let user = req.currentUser; 
    let authenticatedUser = await User.findOne({
        where: {id: user.id},
        attributes: {
            exclude: ['password','createdAt', 'updatedAt']
        }
    });
    res.status(200).json(authenticatedUser);
}));

router.post('/users', asyncHandler(async (req, res) => {
    try {
        let user = await User.create(req.body); 
        res.location('/');
        res.status(201).end();
    } catch (error) {
        if (error.name === "SequelizeValidationError" || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error; 
        }
    }
}));


module.exports = router;
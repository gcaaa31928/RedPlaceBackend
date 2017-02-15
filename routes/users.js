var models = require('../models');
var express = require('express');
var UUID = require('uuid-js');
var router = express.Router();
var logger = require('../utils/logger');

router.get('/:userId', function (req, res, next) {
    models.User.findOne({
        where: {uuid: req.params.userId},
        attributes: ['uuid', 'name', 'email'],
        include: [{
            model: models.UserFriend,
            attributes: ['friendId'],
            include: [{
                model: models.User,
                as: 'friend',
                attributes: ['uuid', 'name']
            }]
        }]
    }).then(function (user) {
        if (user === null)
            res.status(204).send({});
        else
            res.status(200).send(user);
    });
});

router.post('/login', function (req, res, next) {
    var accessToken = UUID.create().toString().replace('-', '');
    models.User.findOne({
        where: {email: req.body.email}
    }).then(function (user) {
        logger.debug(user);
        if (user === null) {
            models.User.create({
                name: req.body.name,
                email: req.body.email,
                accessToken: accessToken
            }).then(function (user) {
                res.status(200).send({accessToken: accessToken});
            }).catch(function(err) {
                throw err;
                // res.status(502).send({reason: "not created"});
            });
        } else {
            user.updateAttributes({
                accessToken: accessToken
            }).then(function(user) {
                res.status(502).send();
            });
        }
    }).catch(function (err) {
        res.status(502).send();
    });
});

router.post('/friends/create', function (req, res, next) {
    models.UserFriend.create({
        userId: req.body.userId,
        friendId: req.body.friendId
    });
});

router.get('/', function (req, res, next) {
    models.User.findAll({
        attributes: ['uuid', 'name'],
        include: [{
            model: models.UserFriend,
            attributes: ['friendId'],
            include: [{
                model: models.User,
                as: 'friend',
                attributes: ['uuid', 'name']
            }]
        }]
    }).then(function (users) {
        res.send(users);
    });
});

module.exports = router;

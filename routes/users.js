var models = require('../models');
var express = require('express');
var UUID = require('uuid-js');
var router = express.Router();
var logger = require('../utils/logger');
var async = require('async');

router.get('/test', function (req, res, next) {
    models.User.findOne({
        where: {uuid: "0"}
    }).then(function (user) {
        user.hasFriend("1");
    });
});


router.post('/login', function (req, res, next) {
    async.waterfall([
        function (callback) {
            models.User.findOne({
                where: {email: req.body.email}
            }).then(function (user) {
                callback(null, user);
            }).catch(function (err) {
                callback(err);
            });
        },
        function (user, callback) {
            var accessToken = UUID.create().toString().replace(/-/g, "");
            if (user == null) {
                models.User.create({
                    name: req.body.name,
                    email: req.body.email,
                    accessToken: accessToken
                }).then(function (user) {
                    res.status(200).send({accessToken: accessToken});
                    callback('accept');
                }).catch(function (err) {
                    callback(err);
                });
            } else {
                user.updateAttributes({
                    accessToken: accessToken
                }).then(function (user) {
                    res.status(200).send({accessToken: accessToken});
                    callback('accept');
                }).catch(function (err) {
                    callback(err);
                })
            }
        }
    ], function (err, result) {
        if (err === 'accept')
            return;
        res.status(500).send(err);
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
module.exports = router;

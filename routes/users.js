var models = require('../models');
var express = require('express');
var UUID = require('uuid-js');
var router = express.Router();
var logger = require('../utils/logger');
var async = require('async');
//
// router.get('/test', function (req, res, next) {
//     models.User.findOne({
//         where: {uuid: "0"}
//     }).then(function (user) {
//         user.hasFriend("4").then(function(result) {
//             logger.debug(result);
//         });
//     });
// });

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
                    photoUrl: req.body.photoUrl,
                    accessToken: accessToken
                }).then(function (user) {
                    res.status(200).send({accessToken: accessToken});
                    callback('accept');
                }).catch(function (err) {
                    callback(err);
                });
            } else {
                user.updateAttributes({
                    name: req.body.name,
                    photoUrl: req.body.photoUrl,
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

router.post('*', function (req, res, next) {
    models.User.findOne({
        where: {accessToken: req.headers.accessToken}
    }).then(function (user) {
        if (user === null) {
            res.status(403).send("access token is wrong");
        } else {
            next();
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});


router.post('/my/friends/add', function (req, res, next) {
    models.User.findOne({
        where: {accessToken: req.headers.accesstoken}
    }).then(function(user) {
        models.UserFriend.create({
            userId: user.uuid,
            friendId: friendId
        }.then(function() {
            res.status(200).send({response: "ok"});
        }).catch(function(err) {
            res.status(500).send(err);
        });
    }).catch(function(err) {
        res.status(500).send(err);
    };
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


router.get('/my/friends', function (req, res, next) {
    models.User.findOne({
        where: {accessToken: req.headers.accesstoken}
    }).then(function (user) {
        if (user === null)
            res.status(502).send("you are not exists");
        user.getFriends().then(function(friends) {
            res.status(200).send(friends);
        });
    }).catch(function (err) {
        logger.error(err);
        res.status(500).send(err);
    });
});
module.exports = router;

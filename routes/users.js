var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (req, res, next) {
    console.log(req.body);
    models.User.create({
        name: req.body.name
    }).then(function () {
        res.status(200);
        res.send({status: 200});
    });
});

router.post('/friends/create', function(req, res, next) {
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

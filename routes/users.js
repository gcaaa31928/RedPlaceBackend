var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    models.User.findAll({
        include: [models.UserFriend]
    }).then(function(users) {
        res.send(users);
    });
});

module.exports = router;

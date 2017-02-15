'use strict';
var logger = require('../utils/logger');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accessToken: DataTypes.STRING,
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.UserFriend, {
                    foreignKey: 'userId'
                });
                // associations can be defined here
            }
        },
        instanceMethods: {
            hasFriend: function(friendUUID) {
                logger.error("call");
                this.getFriends({
                    where: {friendId: friendUUID}
                }).then(function(friend) {
                    logger.debug(friend);
                });
            }
        }
    });
    return User;
};
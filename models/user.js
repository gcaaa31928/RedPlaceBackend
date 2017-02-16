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
                User.belongsToMany(models.User, {
                    as: 'friends',
                    foreignKey: 'userId',
                    otherKey: 'friendId',
                    through: 'UserFriends'
                });
                // associations can be defined here
            }
        },
        instanceMethods: {
            hasThisFriend: function(friendUUID) {
                logger.debug("call");
                this.getFriends().then(function(friend) {
                    logger.debug(friend);
                });
            }
        }
    });
    return User;
};
'use strict';
var logger = require('../utils/logger');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photoUrl: {
            type: DataTypes.STRING
        },
        accessToken: DataTypes.STRING,
        friendToken: DataTypes.STRING,
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
                    through: 'Relationships'
                });
                // associations can be defined here
            }
        },
        instanceMethods: {

        }
    });
    return User;
};
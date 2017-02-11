'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
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
        }
    });
    return User;
};
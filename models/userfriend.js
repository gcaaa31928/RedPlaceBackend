'use strict';
module.exports = function (sequelize, DataTypes) {
    var UserFriend = sequelize.define('UserFriend', {
        userId: DataTypes.UUID,
        friendId: DataTypes.UUID
    }, {
        classMethods: {
            associate: function (models) {
                UserFriend.belongsTo(models.User, {
                    foreignKey: 'userId'
                });
                UserFriend.belongsTo(models.User, {
                    as: 'friend',
                    foreignKey: 'friendId'
                });
                // associations can be defined here
            }
        }
    });
    return UserFriend;
};
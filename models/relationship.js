'use strict';
module.exports = function (sequelize, DataTypes) {
    var Relationship = sequelize.define('Relationship', {
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            }
        },
        friendId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'uuid'
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                // UserFriend.belongsTo(models.User);
                // associations can be defined here
            }
        }
    });
    return Relationship;
};
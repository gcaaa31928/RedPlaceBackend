'use strict';
module.exports = function (sequelize, DataTypes) {
    var Friend = sequelize.define('Friend', {
        user_id: DataTypes.INTEGER,
        friend_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                Friend.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                // associations can be defined here
            }
        }
    });
    return Friend;
};
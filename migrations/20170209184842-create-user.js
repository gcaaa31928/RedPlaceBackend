'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            uuid: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            accessToken: {
                type: Sequelize.STRING,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
    }
};
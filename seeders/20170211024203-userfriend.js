'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('UserFriends', [{
            userId: '0',
            friendId: '1',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            userId: '0',
            friendId: '2',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            userId: '2',
            friendId: '3',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('UserFriends', null, {});
    }
};

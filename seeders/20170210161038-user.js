'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            uuid: '0',
            email: 'redtest@test.test',
            name: 'Red Huang',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            uuid: '1',
            name: 'Red2 Huang',
            email: 'redtest1@test.test',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            uuid: '2',
            name: 'Red3 Huang',
            email: 'redtest2@test.test',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            uuid: '3',
            name: 'Red4 Huang',
            email: 'redtest3@test.test',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

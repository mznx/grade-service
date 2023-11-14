import { Migration } from 'sequelize-cli';

const tableName = 'student';

module.exports = <Migration>{
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            personalCode: {
                type: Sequelize.STRING,
            },

            firstName: {
                type: Sequelize.STRING,
            },

            lastName: {
                type: Sequelize.STRING,
            },

            createdAt: {
                type: Sequelize.DATE,
            },

            updatedAt: {
                type: Sequelize.DATE,
            },
        });
    },

    async down (queryInterface) {
        await queryInterface.dropTable(tableName);
    },
};

import { Migration } from 'sequelize-cli';

const tableName = 'student_grade';

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

            grade: {
                type: Sequelize.TINYINT,
            },

            subject: {
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

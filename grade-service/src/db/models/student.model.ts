import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    const Student = sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        personalCode: {
            type: DataTypes.STRING,
        },

        name: {
            type: DataTypes.STRING,
        },

        lastName: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
    });

    return Student;
};

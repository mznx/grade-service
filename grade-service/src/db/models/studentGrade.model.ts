import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
    const StudentGrade = sequelize.define('student_grade', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        personalCode: {
            type: DataTypes.STRING,
        },

        grade: {
            type: DataTypes.TINYINT,
        },

        subject: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
    });

    StudentGrade.hasOne(sequelize.models['student'], {
        foreignKey: 'personalCode',
        sourceKey: 'personalCode',
    });

    return StudentGrade;
};

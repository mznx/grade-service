import { Sequelize } from 'sequelize';
import StudentModel from './student.model';
import StudentGradeModel from './studentGrade.model';

export default (sequelize: Sequelize) => {
    return {
        student: StudentModel(sequelize),
        studentGrade: StudentGradeModel(sequelize),
    };
};

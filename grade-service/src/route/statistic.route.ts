import { FastifyInstance } from 'fastify';
import studentGrade from '../db/model/studentGrade.model';

export default (fastify: FastifyInstance) => {
    const studentGrade1 = studentGrade(fastify.db.sequelize);

    fastify.get('/statistic/:personalCode', async (request) => {
        const params: any = request.params;
        const personalCode = params.personalCode;
        console.log('personalCode', personalCode);

        const seq = fastify.db.sequelize;

        const studentJSON = await fastify.nats.request('students.v1.get', { personalCode: personalCode });
        const student = JSON.parse(studentJSON).data;

        const statistic = await studentGrade1.findAll({
            attributes: [
                'subject',
                [ seq.fn('max', seq.col('grade')), 'maxGrade' ],
                [ seq.fn('min', seq.col('grade')), 'minGrade' ],
                [ seq.fn('avg', seq.col('grade')), 'avgGrade' ],
                [ seq.fn('count', seq.col('grade')), 'totalGrades' ],
            ],
            group: 'subject',
            where: { personalCode },
        });

        return {
            student,
            statistic,
        };
    });
};

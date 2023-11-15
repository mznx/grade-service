import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) => {
    fastify.get('/statistic/:personalCode', async (request, response) => {
        const params = request.params as { personalCode?: string };

        if (!params.personalCode) {
            response.statusCode = 400;
            throw new Error('personalCode param is required');
        }

        const personalCode = params.personalCode;

        const seq = fastify.db.sequelize;

        const [ student, statistic ] = await Promise.all([

            fastify.db.models.student.findOne({
                attributes: [ 'personalCode', 'name', 'lastName' ],
                where: { personalCode },
            }),

            fastify.db.models.studentGrade.findAll({
                attributes: [
                    'subject',
                    [ seq.fn('max', seq.col('grade')), 'maxGrade' ],
                    [ seq.fn('min', seq.col('grade')), 'minGrade' ],
                    [ seq.fn('avg', seq.col('grade')), 'avgGrade' ],
                    [ seq.fn('count', seq.col('grade')), 'totalGrades' ],
                ],
                group: 'subject',
                where: { personalCode },
            }),

        ]);

        return { student, statistic };
    });
};

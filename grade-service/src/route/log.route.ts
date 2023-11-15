import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) => {
    fastify.get('/log', async (request) => {
        const queryParam = { page: 0, limit: 10 };

        if (request.query) {
            const query = request.query as { page?: string; limit?: string };
            queryParam.page = Number(query.page) ?? queryParam.page;
            queryParam.limit = Number(query.limit) ?? queryParam.limit;
        }

        const data = await fastify.db.models.studentGrade.findAll({
            attributes: [ [ 'createdAt', 'date' ], 'subject', 'grade' ],
            include: [
                {
                    model: fastify.db.models.student,
                    attributes: [ 'personalCode', 'name', 'lastName' ],
                    required: false,
                },
            ],
            limit: queryParam.limit,
            offset: queryParam.page * queryParam.limit,
        });

        return data;
    });
};

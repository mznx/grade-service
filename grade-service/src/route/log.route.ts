import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) => {
    fastify.get('/log', async (request) => {
        const queryParam = { page: 0, limit: 10 };
        if (request.query) {
            const query = request.query as { page?: number; limit: number };
            queryParam.page = query.page ?? queryParam.page;
            queryParam.limit = query.limit ?? queryParam.limit;
        }

        console.log('param', queryParam);

        const res = await fastify.db.models.studentGrade.findAndCountAll({
            limit: queryParam.limit,
            offset: queryParam.page * queryParam.limit,
        });

        return res;
    });
};

import { FastifyInstance } from 'fastify';
import studentGrade from '../db/model/studentGrade.model';

export default (fastify: FastifyInstance) => {
    const studentGrade1 = studentGrade(fastify.db.sequelize);

    fastify.get('/log', async (request) => {
        const queryParam = { page: 0, limit: 10 };
        if (request.query) {
            const query = request.query as { page?: number; limit: number };
            queryParam.page = query.page ?? queryParam.page;
            queryParam.limit = query.limit ?? queryParam.limit;
        }

        console.log('param', queryParam);

        const res = await studentGrade1.findAndCountAll({
            limit: queryParam.limit,
            offset: queryParam.page * queryParam.limit,
        });

        return res;
    });
};

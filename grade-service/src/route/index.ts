import { FastifyInstance } from 'fastify';
import log from './log.route';
import statistic from './statistic.route';

export default (fastify: FastifyInstance) => {
    log(fastify);
    statistic(fastify);
};

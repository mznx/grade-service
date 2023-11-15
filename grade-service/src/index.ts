import Fastify from 'fastify';
import PluginLoader from './plugin';
import RouteLoader from './route';
import { StudentGrade } from './interface/nats.interface';

const fastify = Fastify({
    logger: true,
});

/** Подписка на очередь */
const subscribeOnGrade = () => {
    fastify.nats.subscribe('students.v1.graded', async (message) => {

        const data: StudentGrade = JSON.parse(message).data;
        await fastify.db.models.studentGrade.create({ ...data });
    });
};

(async () => {
    try {
        await fastify.register(PluginLoader);
        RouteLoader(fastify);

        await fastify.listen(fastify.conf.server);
        subscribeOnGrade();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

import Fastify from 'fastify';
import PluginLoader from './plugin';
import RouteLoader from './route';
import studentGrade from './db/model/studentGrade.model';
import { StudentGrade } from './interface/nats.interface';

const fastify = Fastify({
    logger: true,
});

const subscribeOnGrade = () => {
    const studentGrade1 = studentGrade(fastify.db.sequelize);

    // Подписка
    fastify.nats.subscribe('students.v1.graded', async (message: string) => {

        const data: StudentGrade = JSON.parse(message).data;
        console.log('msg:', data);

        await studentGrade1.create({
            personalCode: data.personalCode,
            grade: data.grade,
            subject: data.subject,
        });
    });
};

(async () => {
    try {
        await fastify.register(PluginLoader);
        RouteLoader(fastify);

        subscribeOnGrade();

        await fastify.listen(fastify.conf.server);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

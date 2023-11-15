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

        // Сохраняем очередную оценку
        const data: StudentGrade = JSON.parse(message).data;
        await fastify.db.models.studentGrade.create({ ...data });

        // Сохраняем данные студента
        const personalCode = data.personalCode;
        const studentData = await fastify.db.models.student.findOne({ where: { personalCode }});

        if (!studentData) {
            const studentJSON = await fastify.nats.request('students.v1.get', { personalCode });
            const student = JSON.parse(studentJSON).data;
            await fastify.db.models.student.create(student);
        }
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

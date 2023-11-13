import Fastify from 'fastify';
import { connect, StringCodec, Subscription } from 'nats';

const fastify = Fastify({
    logger: true,
});

const sc = StringCodec();

async function listenNats(sub: Subscription) {
    return Promise.resolve((async () => {
        const subj = sub.getSubject();
        console.log(`listening for ${subj}`);
        for await (const m of sub) {
            console.log('m', sc.decode(m.data));
        }
    })());
}

(async () => {
    try {
        const nc = await connect({ servers: '192.162.246.63:4222' });
        console.log(`connected to ${nc.getServer()}`);

        // Подписка
        const s1 = nc.subscribe('students.v1.graded');
        listenNats(s1);

        // Получение информации
        const req = await nc.request('students.v1.get', sc.encode(JSON.stringify({ personalCode: '1383DB747648' })));
        console.log('req', sc.decode(req.data));

        await fastify.listen({
            host: '0.0.0.0',
            port: 3001,
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();

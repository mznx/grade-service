import EventEmitter from 'node:events';
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { StringCodec, connect } from 'nats';

interface NatsConfig {
    host: string;
    port: number;
}

const sc = StringCodec();

const init = async (config: NatsConfig) => {
    const emitter = new EventEmitter();

    const nc = await connect({ servers: `${config.host}:${config.port}` });
    console.log(`NATS Plugin: Connected to ${nc.getServer()}`);

    return {
        connection: nc,

        /** Подписаться на тему */
        subscribe: (subject: string, callback: (message: string) => void) => {
            const sub = nc.subscribe(subject);
            emitter.on(subject, callback);

            (async () => {
                for await (const msg of sub) {
                    emitter.emit(subject, sc.decode(msg.data));
                }
            })();
        },

        /** Запрос данных из темы */
        request: async (subject: string, data: Record<string, string | number>) => {
            const req = await nc.request(subject, sc.encode(JSON.stringify(data)));
            return sc.decode(req.data);
        },
    };
};

declare module 'fastify' {
    interface FastifyInstance { nats: Awaited<ReturnType<typeof init>> }
}

export default fastifyPlugin(async (fastify: FastifyInstance, config: NatsConfig) => {
    const nats = await init(config);
    fastify.decorate('nats', nats);
});

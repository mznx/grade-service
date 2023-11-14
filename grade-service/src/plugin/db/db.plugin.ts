import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Options, Sequelize } from 'sequelize';

const init = async (config: Options) => {
    const sequelize = new Sequelize(config);
    await sequelize.authenticate();
    console.log(`DB Plugin: Connected to ${config.host}:${config.port}`);

    return {
        sequelize: sequelize,
    };
};

declare module 'fastify' {
    interface FastifyInstance { db: Awaited<ReturnType<typeof init>> }
}

export default fastifyPlugin(async (fastify: FastifyInstance, dbConfig: Options) => {
    const db = await init(dbConfig);
    fastify.decorate('db', db);
});

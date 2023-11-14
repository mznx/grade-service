import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import conf from './conf/conf.plugin';
import nats from './nats/nats.plugin';
import db from './db/db.plugin';

export default fastifyPlugin(async (fastify: FastifyInstance) => {
    await fastify.register(conf);

    await fastify.register(nats, fastify.conf.nats);

    await fastify.register(db, { ...fastify.conf.dbCore, dialect: 'mysql' });
});

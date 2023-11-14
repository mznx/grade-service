import { Options } from 'sequelize';
import config from '../config/config';

const conf: Record<string, Options> = {
    development: {
        host: config.dbCore.host,
        port: config.dbCore.port,
        database: config.dbCore.database,
        username: config.dbCore.username,
        password: config.dbCore.password,
        dialect: 'mysql',
    },
};

module.exports = conf;

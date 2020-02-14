import * as knex from 'knex';

import { config } from '../../knexfile';

const environment = process.env.DB_ENV || 'development';
export const db = knex(config[environment]);

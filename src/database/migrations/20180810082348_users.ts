import * as Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('users', (users) => {
    users.increments();

    users
      .string('username', 255)
      .notNullable()
      .unique();
    users.string('password', 255).notNullable();
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTableIfExists('users');
};

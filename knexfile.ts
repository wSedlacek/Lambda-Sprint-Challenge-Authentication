export const config = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './database/seeds' }
  }
};

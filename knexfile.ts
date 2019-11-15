export const config = {
  development: {
    client: 'sqlite3',
    connection: { filename: './src/database/auth.db' },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './src/database/seeds' }
  }
};

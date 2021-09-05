
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'secretwerewolf'
    }
  },

  migrations: {
    tableName: 'account',
    directory: 'db'
  }
}

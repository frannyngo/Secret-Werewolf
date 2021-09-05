
exports.up = function(knex) {
    return knex.schema.createTable('account', (table) => {
        table.bigIncrements('account_id');
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.string('email').notNullable().unique();
        table.integer('total_games');
        table.integer('total_wins');
        table.integer('total_kills');
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('account');
};

const knex = require('knex');
const developmentConfig = require('./knexfile').development;
const db = knex(developmentConfig);

module.exports = db;
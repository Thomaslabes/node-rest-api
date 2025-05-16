const knex = require('knex');

const dbConfig = {
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "loja"
    },
    pool: { min: 0, max: 7 }
};

const conn = knex(dbConfig);

module.exports = conn;
const { log } = require("console");
const { Client } = require("pg");

module.exports.client = new Client({
    user: "postgres",
    password: "data_pass",
    host: "127.0.0.1",
    port: 5432,
    database: "test",
});

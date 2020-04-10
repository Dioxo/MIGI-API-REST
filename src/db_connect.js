const config = require('config');
const mysql = require('mysql');

module.exports = mysql.createConnection({
    host     : config.get("db_host"),
    user     : config.get("db_user"),
    port     : config.get("db_port"),
    password : config.get("db_password"),
    database : config.get("db_name")
});
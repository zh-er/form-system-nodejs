const {SQLITE3_DB} = require("../../config/config");
const {Sequelize} = require("sequelize");
const path = require("path");

const database = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'data', SQLITE3_DB),
})

module.exports = database;

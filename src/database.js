const sqlite3 = require("sqlite3");
const path = require("path");
const {Report} = require("./models/Report.model");
const {User} = require("./models/User.model");
const {SQLITE3_DB} = require("../config/config");

const initDb = async () => {
    return new Promise((resolve, reject) => {
        new sqlite3.Database(
            path.join(process.cwd(), 'data', SQLITE3_DB),
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            async (error) => {
                if (error) {
                    reject(error.message);
                }

                // initialize the database
                await User.sync()
                await Report.sync()

                resolve();
            }
        )
    })
}

module.exports.initDb = initDb;

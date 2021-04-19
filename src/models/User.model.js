const {Sequelize, Model, DataTypes} = require('sequelize');
const database = require('./database');
const bcrypt = require('bcrypt');
const {DEFAULT_ADMIN_USERNAME} = require("../../config/config");
const {DEFAULT_ADMIN_PASSWORD} = require("../../config/config");
const {DEFAULT_ADMIN_EMAIL} = require("../../config/config");
const {UserRoleEnum} = require("./user-role.enum");

class User extends Model {

    async validatePassword(password) {
        return new Promise((resolve, reject) => {
            console.log('compare', password, this.password);
            bcrypt.compare(password, this.password, (err, matched) => {
                console.log('result', matched, err);
                if (matched) {
                    return resolve(true);
                }
                return reject(err);
            })
        })
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.INTEGER,
        values: Object.values(UserRoleEnum),
        defaultValue: UserRoleEnum.USER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database,
    modelName: 'users',
    hooks: {
        beforeCreate: async (user, options) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
        },
        afterSync: async (options) => {
            await initAdmin()
        }
    }
})

const initAdmin = async () => {
    const result = await User.findOne({
        where: {
            email: DEFAULT_ADMIN_EMAIL
        }
    })

    if (result === null) {
        await User.create({
            email: DEFAULT_ADMIN_EMAIL,
            password: DEFAULT_ADMIN_PASSWORD,
            username: DEFAULT_ADMIN_USERNAME,
            role: UserRoleEnum.ADMIN,
        })
    }
}

module.exports.User = User;

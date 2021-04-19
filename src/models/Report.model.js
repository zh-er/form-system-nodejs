const {ReportStatusEnum} = require("./Report-Status.enum");
const {Sequelize, DataTypes, Model} = require('sequelize');
const database = require('./database');
const {User} = require("./User.model");

class Report extends Model {
}

Report.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: DataTypes.INTEGER,
        values: Object.values(ReportStatusEnum),
        defaultValue: ReportStatusEnum.PENDING
    }
}, {
    sequelize: database,
    modelName: 'reports'
})

Report.belongsTo(User, {foreignKey: 'createdByUserId', as: 'createdBy'})
Report.belongsTo(User, {foreignKey: 'updatedByUserId', as: 'updatedBy'})

module.exports.Report = Report;

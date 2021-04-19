const {User} = require("./models/User.model");
const {ReportStatusEnum} = require("./models/Report-Status.enum");
const {UserRoleEnum} = require("./models/user-role.enum");
const {Report} = require("./models/Report.model");

const getReports = async (req, res) => {
    try {
        const {user} = req;
        const queryCondition = (user.role === UserRoleEnum.ADMIN) ?
            {} : {
                where: {
                    status: ReportStatusEnum.APPROVED
                }
            }
        const reports = await Report.findAll({
            ...queryCondition,
            include: [
                {model: User, attributes: ['username', 'id'], as: 'createdBy'},
                {model: User, attributes: ['username', 'id'], as: 'updatedBy'},
            ]
        })
        return res.json({
            data: reports,
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const getReportById = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findByPk(reportId, {
            include: [
                {model: User, attributes: ['username', 'id'], as: 'createdBy'},
                {model: User, attributes: ['username', 'id'], as: 'updatedBy'},
            ]
        })
        return res.json({
            data: report
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const createReport = async (req, res) => {

    try {
        const {user} = req;
        const {content} = req.body;

        const report = await Report.create({
            content,
            createdByUserId: user.id,
            updatedByUserId: user.id,
            status: ReportStatusEnum.PENDING,
        })

        return res.json({
            data: report
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateReportById = async (req, res) => {

    try {
        const reportId = Number(req.params.id);

        if (!reportId) {
            return res.status(404).json({
                message: 'Report not found!'
            })
        }

        const {user} = req;
        const {content, status} = req.body;

        const newContent = {
            content,
            updatedByUserId: user.id
        }

        if (user.role === UserRoleEnum.ADMIN && !!status) {
            newContent.status = status;
        }

        await Report.update(newContent, {
            where: {
                id: reportId
            }
        })

        const report = await Report.findByPk(reportId)

        return res.json({
            data: report
        })
    } catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}


module.exports = {
    getReports,
    getReportById,
    createReport,
    updateReportById,
}

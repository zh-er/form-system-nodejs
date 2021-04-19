const {updateReportById} = require("./report.handler");
const {createReport} = require("./report.handler");
const {getReportById, getReports} = require("./report.handler");
const express = require('express')
const router = express.Router()

router.get('/', getReports)
router.post('/', createReport)
router.get('/:id', getReportById)
router.put('/:id', updateReportById)


module.exports = router;

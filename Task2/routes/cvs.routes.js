const express = require('express')
const { getCSVData } = require('../controllers/cvs.controller')
const router = express .Router()

router.get('/data',getCSVData)

module.exports=router
 
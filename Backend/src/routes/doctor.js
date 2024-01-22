"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/doctor:

//const permissions = require('../middlewares/permissions')
const doctor = require('../controllers/doctor')

const upload = require('../middlewares/upload')

// URL: /doctors

router.route('/')
    .get(doctor.list)
    .post(upload.array('image'), doctor.create)

router.route('/:id')
    .get(doctor.read)
    .put(upload.array('image'), doctor.update)
    .patch(upload.array('image'), doctor.update)
    .delete(doctor.delete)

/* ------------------------------------------------------- */
module.exports = router
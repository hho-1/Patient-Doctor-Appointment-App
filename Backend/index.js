"use strict"


const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
const MODE = process.env.MODE || "Product"
 


// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:
// import express from 'express';   export >>>  "type":"module"
// Accept JSON and convert to Object:
app.use(express.json())

/* ------------------------------------------------------- */

// CORS
const cors = require('cors')
app.use(cors({
    //"origin": "*",
    // "origin": "http://localhost:5173/",
    "origin": ["http://localhost:5173", "http://localhost:3000"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }))

/* ------------------------------------------------------- */


// Call Static Files from uploadFile
app.use('/img', express.static('./upload'))

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// Run Logger:
app.use(require('./src/middlewares/logger'))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Doctor Appointment API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})
// Mail: nodemailer

// Routes:
app.use(require('./src/routes'))

/* ------------------------------------------------------- */

//errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
//app.listen("8000", "0.0.0.0", () => console.log(`http://127.0.0.1:8000`));       // for docker

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
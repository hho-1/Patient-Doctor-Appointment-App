"use strict"


const { mongoose } = require('../configs/dbConnection')

const { dayNames } = require('../configs/constraints')
// WeekDay Model:

const WeekDaySchema = new mongoose.Schema({

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    name: {
        type: String,
        enum: dayNames,
        unique: true,
        required: true
    },
    startHour: {
        type: String,
        trim: true,
        required: true
    },
    finishHour: {
        type: String,
        trim: true,
        required: true
    },
    lunchStart: {
        type: String,
        trim: true
    },
    lunchFinish: {
        type: String,
        trim: true
    },
    appointmentDuration: {
        type: String,
        trim: true,
        required: true
    },
    hours: [{
        type: String,
        trim: true
    }],
    isHoliday: {
        type: Boolean, 
        default: false
    }
    
}, { collection: 'weekDays', timestamps: true })


// FOR REACT PROJECT:
WeekDaySchema.pre('init', function (data) {

    data.id = data._id
    data.createds = data.createdAt.toLocaleDateString('de-de')
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('WeekDay', WeekDaySchema)
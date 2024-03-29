"use strict"

// Appointment Controller:

const Appointment = require('../models/appointment')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Appointments"]
            #swagger.summary = "List Appointments"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Appointment)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Appointment),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Appointments"]
            #swagger.summary = "Create Appointment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Appointment' }
            }
        */

        const data = await Appointment.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Appointments"]
            #swagger.summary = "Get Single Appointment"
        */

        const data = await Appointment.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Appointments"]
            #swagger.summary = "Update Appointment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Appointment' }
            }
        */

        const data = await Appointment.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Appointment.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Appointments"]
            #swagger.summary = "Delete Appointment"
        */

        const data = await Appointment.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}
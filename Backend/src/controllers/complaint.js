"use strict"

// Complaint Controller:

const Complaint = require('../models/complaint')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Complaints"]
            #swagger.summary = "List Complaints"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Complaint)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Complaint),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Complaints"]
            #swagger.summary = "Create Complaint"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Complaint' }
            }
        */

        const data = await Complaint.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Complaints"]
            #swagger.summary = "Get Single Complaint"
        */

        const data = await Complaint.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Complaints"]
            #swagger.summary = "Update Complaint"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/Complaint' }
            }
        */

        const data = await Complaint.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Complaint.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Complaints"]
            #swagger.summary = "Delete Complaint"
        */

        const data = await Complaint.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}
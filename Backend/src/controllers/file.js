"use strict"

// File Controller:

const File = require('../models/file')


module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Files"]
            #swagger.summary = "List Files"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(File)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(File),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Files"]
            #swagger.summary = "Create File"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/File' }
            }
        */
             req.body.fileName = req.file.filename;
             req.body.path = req.file.path;
             req.body.mimeType = req.file.mimetype;
            //req.body = { ...req.body, ...req.file }          Hepsini tek elde hizlica yapmak icin
            req.body.extention = req.body.fileName.split('.').pop()
            // console.log(req.body.fileName.split('.'))
            // console.log(req.body.fileName.split('.').pop())
            // console.log(req.file);
            // console.log(req.file);
            // console.log(req.files);


        /* if (req?.admin) {
            // Set userIds from login info: 
            req.body.userId = req.admin._id             // burasi düzenlenecek. File'i olusturan id'yi otomatik aldirmak istiyoruz

            }
            else if(req?.doctor) {
            // Set userIds from login info: 
            req.body.userId = req.doctor._id             

            }
            else if(req?.patient) {
            // Set userIds from login info: 
            req.body.userId = req.patient._id             

            }
        
        
        */

        const data = await File.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Files"]
            #swagger.summary = "Get Single File"
        */

        const data = await File.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Files"]
            #swagger.summary = "Update File"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: '#/definitions/File' }
            }
        */

        req.body.images = req.body?.images || []

        for(let file of req.files){
            req.body.images.push('/img/' + file.originalname)
        }
        console.log(req.body.images);


        const data = await File.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await File.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Files"]
            #swagger.summary = "Delete File"
        */

        const data = await File.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}
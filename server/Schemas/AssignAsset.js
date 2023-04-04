var mongoose = require('mongoose');
let AssignAsset = new mongoose.Schema({

            issueddate: {
                type: String
            },
            assignasset: {
                type: String
            },
            towhom: {
                type: String
            },
            serialno: {
                type: String
            },
            remark: {
                type: String
            },
            qrcode:{
                type: String
            }
})

module.exports = mongoose.model('AssignAsset', AssignAsset)
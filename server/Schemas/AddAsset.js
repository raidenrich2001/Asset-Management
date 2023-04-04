var mongoose = require('mongoose');
let AddAsset = new mongoose.Schema({
        brand: {
            type: String
        },
        model: {
            type: String
        },
        type: {
            type: String
        },
        serialno: {
            type: String
        },
        worth: {
            type: String
        },
        assetID: {
            type: String
        },
        qrcode: {
            type: String
        }
})

module.exports = mongoose.model('AddAsset', AddAsset)
var mongoose=require('mongoose');
let DamagedAssets=new mongoose.Schema({
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

module.exports=mongoose.model('DamagedAssets',DamagedAssets)
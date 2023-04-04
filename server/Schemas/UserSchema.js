var mongoose=require('mongoose');
let UserSchema=new mongoose.Schema({
name: {
    type: String
},
empid: {
    type: String
},
email: {
    type: String
},
password: {
    type: String
},
department: {
    type: String
},
type: {
    type: String
}               
})

module.exports=mongoose.model('UserSchema',UserSchema)
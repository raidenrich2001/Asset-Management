var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors')
var app = express();
var path = require('path')
var router = require('./Router')
var bodyparser = require('body-parser')
var url="mongodb://127.0.0.1:27017/Asset"
app.use(cors({origin:'http://172.16.0.100:3004'}));
// app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json())
// app.use(express.static(path.join(__dirname)))
mongoose.set("strictQuery", true);
mongoose.connect(url,(err)=>
{if(err)
{
console.log(err)
}
else{
    console.log('connected to db')
}
}
)


app.use("/",router)

app.listen(3005,()=>{
    console.log('Server is listening in port 3005')
})
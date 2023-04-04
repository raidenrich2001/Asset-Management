var express = require('express');
var router = express.Router();
var UserSchema = require('./Schemas/UserSchema');
var AddAsset = require('./Schemas/AddAsset');
var AssignAsset = require('./Schemas/AssignAsset');
var DamageAsset = require('./Schemas/DamageAsset');
var IdleAsset = require('./Schemas/IdleAsset');
var QRCode = require('qrcode')
const pagesize = 10;
const selectsize = 3;

//Create User Data
router.post('/signup', (req, res) => {
    UserSchema.findOne({ empid: req.body.empid.toLowerCase() }, (err, user) => {
        if (user) {
            res.json({ message: "User Already Exists" })
        }
        else {
            var data = new UserSchema({
                name: req.body.name,
                empid: req.body.empid.toLowerCase(),
                email: req.body.email,
                password: req.body.password,
                department: req.body.department,
                type: req.body.type
            })

            data.save();
            res.json({ message: 'Successfully Registered' })
        }
    })
})

//Login User
router.post('/userlogin', (req, res) => {
    UserSchema.findOne({ email: req.body.email }, (err, employee) => {
        if (employee) {
            if (employee.type === 'user') {
                if (req.body.password === employee.password) {

                    res.json({ message: "Successfully Login", user: employee })

                }
                else {
                    res.json({ message: "Wrong Credentials" })
                }
            }
            else {
                res.json({ message: "User Not Found" })
            }
        }
        else {
            res.json({ message: "User Not Found" })
        }

    })

})

//Login Admin
router.post('/adminlogin', (req, res) => {
    UserSchema.findOne({ email: req.body.email }, (err, employee) => {
        if (employee) {
            if (employee.type === 'admin') {
                if (req.body.password === employee.password) {

                    res.json({ message: "Successfully Login", user: employee })

                }
                else {
                    res.json({ message: "Wrong Credentials" })
                }
            }
            else {
                res.json({ message: "User Not Found" })
            }
        }
        else {
            res.json({ message: "User Not Found" })
        }
    })
})



//Create Asset
router.post('/addasset', async (req, res) => {
    // const assets=JSON.parse(req.body.asset)
    const assetsdataSNO = await AddAsset.findOne({ serialno: req.body.serialno.toLocaleUpperCase() });
    const assetsdataID = await AddAsset.findOne({ assetID: req.body.assetID.toLocaleUpperCase() });
    console.log(assetsdataSNO)
    if (!assetsdataSNO && !assetsdataID) {
        QRCode.toDataURL(`Brand = ${req.body.brand} / Model = ${req.body.model} / Type = ${req.body.type} / Serial No = ${req.body.serialno.toLocaleUpperCase()} / Worth = ${req.body.worth} / Asset ID = ${req.body.assetID.toLocaleUpperCase()}`, function (err, url) {
            var data = new AddAsset({
                brand: req.body.brand,
                model: req.body.model,
                type: req.body.type,
                serialno: req.body.serialno.toLocaleUpperCase(),
                worth: req.body.worth,
                assetID: req.body.assetID.toLocaleUpperCase(),
                qrcode: url
            })
            data.save();
            res.json({ message: "Submitted" })
        })
    }
    else {
        res.json({ message: "Found an asset with the same serial number or asset ID" })
    }

})

//Create Assigned Asset
router.post('/assignasset', (req, res) => {
    AssignAsset.findOne({ serialno: req.body.serialno.toLocaleUpperCase() }, (err, get) => {
        console.log(get)
        if (!get) {
            QRCode.toDataURL(`Date = ${req.body.issueddate} / ${req.body.assignasset} / Assigned To = ${req.body.towhom} / Remarks =  ${req.body.remark}`, function (err, url) {
                var data = new AssignAsset({
                    issueddate: req.body.issueddate,
                    assignasset: req.body.assignasset,
                    serialno: req.body.serialno.toLocaleUpperCase(),
                    towhom: req.body.towhom,
                    remark: req.body.remark,
                    qrcode: url
                })
                data.save();
                res.json({ message: "Assigned" });

            })
        }
        else {
            res.json({ message: "Found an asset with the same serial number " })
        }
    })
})

//Create Idle Asset
router.post('/idleasset', async (req, res) => {
    // const assets=JSON.parse(req.body.asset)
    const assetsdataSNO = await IdleAsset.findOne({ serialno: req.body.serialno.toLocaleUpperCase() });
    const assetsdataID = await IdleAsset.findOne({ assetID: req.body.assetID.toLocaleUpperCase() });
    if (!assetsdataSNO && !assetsdataID) {
        QRCode.toDataURL(`Brand = ${req.body.brand} / Model = ${req.body.model} / Type = ${req.body.type} / Serial No = ${req.body.serialno.toLocaleUpperCase()} / Worth = ${req.body.worth} / Asset ID = ${req.body.assetID.toLocaleUpperCase()}`, function (err, url) {
            var data = new IdleAsset({
                brand: req.body.brand,
                model: req.body.model,
                type: req.body.type,
                serialno: req.body.serialno.toLocaleUpperCase(),
                worth: req.body.worth,
                assetID: req.body.assetID.toLocaleUpperCase(),
                qrcode: url
            })
            data.save();
            res.json({ message: "Submitted" })
        })
    }
    else {
        res.json({ message: "Found an asset with the same serial number or asset ID" })
    }
})

//Post to Damged Collection
router.post('/damagedassset',async (req, res) => {
    console.log(req.body.brand)
    const assetsdataSNO = await DamageAsset.findOne({ serialno: req.body.serialno.toLocaleUpperCase() });
    if(!assetsdataSNO) {
    QRCode.toDataURL(`Brand = ${req.body.brand} / Model = ${req.body.model} / Type = ${req.body.type} / Serial No = ${req.body.serialno.toLocaleUpperCase()} / Worth = ${req.body.worth} / Asset ID = ${req.body.assetID.toLocaleUpperCase()}`, function (err, url) {
        var data = new DamageAsset({
            brand: req.body.brand,
            model: req.body.model,
            type: req.body.type,
            serialno: req.body.serialno.toLocaleUpperCase(),
            worth: req.body.worth,
            assetID: req.body.assetID.toLocaleUpperCase(),
            qrcode: url
        })
        data.save();
        res.json({message: "Added to Damaged Assets"});
    })
    }
    else {
        res.json({ message: "Found an asset with the same serial number or asset ID" })
    }
})


//Get All users
router.get('/getalluser', async (req, res) => {
    const data = await UserSchema.find()
    res.json(data)
})

//Get one users
router.get('/getoneuser/:name', async (req, res) => {
    const data = await UserSchema.findOne({ name: req.params.name })
    res.json(data)
})

//Get all  Asset
router.get('/getallasset', async (req, res) => {
    const data = await AddAsset.find()
    res.json(data)
})

//Get all  Asset Worth
router.get('/getallassetworth', async (req, res) => {
    const data = await AddAsset.find()
    dataworth = data.map((worth) => worth.worth)
    res.json(dataworth)
})

router.get('/getoneuserassignedasset/:name', async (req, res) => {
    const data = await AssignAsset.find({ towhom: req.params.name })
    res.json(data)
})

//Get One Asset
router.get('/getoneasset/:id', async (req, res) => {
    const data = await AddAsset.findById(req.params.id)
    res.json(data)
})

//Get One Asset using Serial No
router.get('/getoneassetusingserialno/:serialno', async (req, res) => {
    const data = await AddAsset.findOne({ serialno: req.params.serialno.toLocaleUpperCase() })
    res.json(data)
})

//Get One Assign
router.get('/getoneassignusingserialno/:serialno', async (req, res) => {
    const data = await AssignAsset.findOne({ serialno: req.params.serialno.toLocaleUpperCase() })
    res.json(data)
})

//Get all  Asset length
router.get('/getallassetlength', async (req, res) => {
    const data = await AddAsset.find().count()
    res.json(data)
})

//Get all Assign Asset length
router.get('/getallassignassetlength', async (req, res) => {
    const data = await AssignAsset.find().count()
    res.json(data)
})

//Get all Idle Asset length
router.get('/getallidleassetlength', async (req, res) => {
    const data = await IdleAsset.find().count()
    res.json(data)
})

//Get Damaged Count
router.get('/getdamagelength', async (req, res) => {
    const data = await DamageAsset.find().count()
    res.json(data)
})

//Get all  Asset Limited
router.get('/getallassetlimited', async (req, res) => {
    const { page = 0 } = req.query;
    const data = await AddAsset.find({}, null, { skip: (parseInt(page * pagesize)), limit: pagesize })
    res.json(data)
})

//Get all Asset Select Limited
router.get('/getallselectassetlimited', async (req, res) => {
    const { page = 0 } = req.query;
    const data = await IdleAsset.find({}, null, { skip: (parseInt(page * selectsize)), limit: selectsize })
    res.json(data)
})

//Get all Assign Asset Limited
router.get('/getallassignassetlimited', async (req, res) => {
    const { page = 0 } = req.query;
    const data = await AssignAsset.find({}, null, { skip: (parseInt(page * pagesize)), limit: pagesize })
    res.json(data)
})

//Get all  Idle Assets Limited
router.get('/getallidleassetlimited', async (req, res) => {
    const { page = 0 } = req.query;
    const data = await IdleAsset.find({}, null, { skip: (parseInt(page * pagesize)), limit: pagesize })
    res.json(data)
})

//Get all  Damaged Assets Limited
router.get('/getalldamagedassetlimited', async (req, res) => {
    const { page = 0 } = req.query;
    const data = await DamageAsset.find({}, null, { skip: (parseInt(page * pagesize)), limit: pagesize })
    res.json(data)
})

//Get Asset using search
router.get('/getallassetusingsearch/:searches', async (req, res) => {
    // const query = { $text: { $search: req.params.searches} };
    // const data = await AddAsset.find(query)

    const data = await AddAsset.find({
        $or: [
            { model: { $regex: req.params.searches, $options: 'i' } },
            { brand: { $regex: req.params.searches, $options: 'i' } },
            { serialno: { $regex: req.params.searches, $options: 'i' } },
            { type: { $regex: req.params.searches, $options: 'i' } },
            { worth: { $regex: req.params.searches, $options: 'i' } },
            { assetID: { $regex: req.params.searches, $options: 'i' } }
        ]
    })
    res.json(data)
})

//Get Assign Asset using search
router.get('/getallassignusingsearch/:searches', async (req, res) => {
    // const query = { $text: { $search: req.params.searches} };
    // const data = await AssignAsset.find(query)
    const data = await AssignAsset.find({
        $or: [
            { issueddate: { $regex: new RegExp(req.params.searches), $options: "i" } },
            { towhom: { $regex: new RegExp(req.params.searches), $options: "i" } },
            { serialno: { $regex: new RegExp(req.params.searches), $options: "i" } },
            { assignasset: { $regex: new RegExp(req.params.searches), $options: "i" } },
            { remark: { $regex: new RegExp(req.params.searches), $options: "i" } },
            { assetID: { $regex: req.params.searches, $options: 'i' } }
        ]
    });
    res.json(data)
})

//Get Idle Asset using search
router.get('/getallidleusingsearch/:searches', async (req, res) => {
    // const query = { $text: { $search: req.params.searches} };
    // const data = await IdleAsset.find(query)
    const data = await IdleAsset.find({
        $or: [
            { model: { $regex: req.params.searches, $options: 'i' } },
            { brand: { $regex: req.params.searches, $options: 'i' } },
            { serialno: { $regex: req.params.searches, $options: 'i' } },
            { type: { $regex: req.params.searches, $options: 'i' } },
            { worth: { $regex: req.params.searches, $options: 'i' } },
            { assetID: { $regex: req.params.searches, $options: 'i' } }
        ]
    })
    res.json(data)
})

//Get Damaged Asset using search
router.get('/getalldamagedusingsearch/:searches', async (req, res) => {
    // const query = { $text: { $search: req.params.searches} };
    // const data = await DamageAsset.find(query)
    const data = await DamageAsset.find({
        $or: [
            { model: { $regex: req.params.searches, $options: 'i' } },
            { brand: { $regex: req.params.searches, $options: 'i' } },
            { serialno: { $regex: req.params.searches, $options: 'i' } },
            { type: { $regex: req.params.searches, $options: 'i' } },
            { worth: { $regex: req.params.searches, $options: 'i' } },
            { assetID: { $regex: req.params.searches, $options: 'i' } }
        ]
    })
    res.json(data)
})







//Edit one Asset in Asset
router.patch('/editoneasset/:serialno/:assetID', async (req, res) => {
    const assetsdataSNOfromParams = await AddAsset.findOne({ serialno: req.params.serialno.toLocaleUpperCase() });
    const assetsdataSNOfromBody = await AddAsset.findOne({ serialno: req.body.serialno.toLocaleUpperCase() });
    const assetdataIDfromBody = await AddAsset.findOne({ assetID: req.body.assetID.toLocaleUpperCase() });
    const assetsdataIDfromParams = await AddAsset.findOne({ assetID: req.params.assetID.toLocaleUpperCase() });
    const DoEdit = () => {
        QRCode.toDataURL(`Brand = ${req.body.brand} / Model = ${req.body.model} / Type = ${req.body.type} / Serial No = ${req.body.serialno.toLocaleUpperCase()} / Worth = ${req.body.worth} / Asset ID = ${req.body.assetID.toLocaleUpperCase()}`, function (err, url) {
            assetsdataSNOfromParams.brand = req.body.brand
            assetsdataSNOfromParams.model = req.body.model
            assetsdataSNOfromParams.type = req.body.type
            assetsdataSNOfromParams.serialno = req.body.serialno.toLocaleUpperCase()
            assetsdataSNOfromParams.worth = req.body.worth
            assetsdataSNOfromParams.assetID = req.body.assetID.toLocaleUpperCase()
            assetsdataSNOfromParams.qrcode = url;
            assetsdataSNOfromParams.save();
            res.json({ message: 'Updated Successfully' })
        });
    }
    if (assetsdataSNOfromBody) {
        if (req.params.serialno.toLocaleUpperCase() === req.body.serialno.toLocaleUpperCase()) {
            if (assetdataIDfromBody) {
                if (req.params.assetID.toLocaleUpperCase() === req.body.assetID.toLocaleUpperCase()) {
                    DoEdit();
                }
                else {
                    res.json({ message: 'Asset ID already exists' })
                }
            }
            else {
                DoEdit();
            }
        }
        else {
            res.json({ message: 'Serial No already exists' })
        }
    }
    else {
        if (assetdataIDfromBody) {
            if (req.params.assetID.toLocaleUpperCase() === req.body.assetID.toLocaleUpperCase()) {
                DoEdit();
            }
            else {
                res.json({ message: 'Asset ID already exists' })
            }
        }
        else {
            DoEdit();
        }
    }
})

//Edit one Asset in Idle
router.patch('/editoneidleasset/:serialno/:assetID', async (req, res) => {
    const assetsdataSNOfromParams = await IdleAsset.findOne({ serialno: req.params.serialno.toLocaleUpperCase() });
    const assetsdataSNOfromBody = await IdleAsset.findOne({ serialno: req.body.serialno.toLocaleUpperCase() });
    const assetdataIDfromBody = await IdleAsset.findOne({ assetID: req.body.assetID.toLocaleUpperCase() });
    const assetsdataIDfromParams = await IdleAsset.findOne({ assetID: req.params.assetID.toLocaleUpperCase() });
    const DoEdit = () => {
        QRCode.toDataURL(`Brand = ${req.body.brand} / Model = ${req.body.model} / Type = ${req.body.type} / Serial No = ${req.body.serialno.toLocaleUpperCase()} / Worth = ${req.body.worth} / Asset ID = ${req.body.assetID.toLocaleUpperCase()}`, function (err, url) {
            assetsdataSNOfromParams.brand = req.body.brand
            assetsdataSNOfromParams.model = req.body.model
            assetsdataSNOfromParams.type = req.body.type
            assetsdataSNOfromParams.serialno = req.body.serialno.toLocaleUpperCase()
            assetsdataSNOfromParams.worth = req.body.worth
            assetsdataSNOfromParams.assetID = req.body.assetID.toLocaleUpperCase()
            assetsdataSNOfromParams.qrcode = url;
            assetsdataSNOfromParams.save();
            res.json({ message: 'Updated Successfully' })
        });
    }
    if(assetsdataSNOfromParams)
    {
   if (assetsdataSNOfromBody) {
        if (req.params.serialno.toLocaleUpperCase() === req.body.serialno.toLocaleUpperCase()) {
            if (assetdataIDfromBody) {
                if (req.params.assetID.toLocaleUpperCase() === req.body.assetID.toLocaleUpperCase()) {
                    DoEdit();
                }
                else {
                    res.json({ message: 'Asset ID already exists' })
                }
            }
            else {
                DoEdit();
            }
        }
        else {
            res.json({ message: 'Serial No already exists' })
        }
    }
    else {
        if (assetdataIDfromBody) {
            if (req.params.assetID.toLocaleUpperCase() === req.body.assetID.toLocaleUpperCase()) {
                DoEdit();
            }
            else {
                res.json({ message: 'Asset ID already exists' })
            }
        }
        else {
            DoEdit();
        }
    }}
})

//Edit one Assigned Asset
router.patch('/editoneassinasset/:serialno', async (req, res) => {
    var data = await AssignAsset.findOne({ serialno: req.params.serialno.toLocaleUpperCase() })
    if (data) {
        QRCode.toDataURL(`Date = ${req.body.issueddate} / ${req.body.assignasset} / Assigned To = ${req.body.towhom} / Remarks =  ${req.body.remark}`, function (err, url) {
            data.issueddate = req.body.issueddate;
            data.assignasset = req.body.assignasset;
            data.serialno = req.body.serialno.toLocaleUpperCase();
            data.towhom = req.body.towhom;
            data.remark = req.body.remark;
            data.qrcode = url;
            data.save();
            res.json({ message: 'Updated Successfully' })
        })
    }
})

//Edit one Assigned Asset special for asset editing
router.patch('/editoneassinassetforassetediting/:serialno', async (req, res) => {
    var data = await AssignAsset.findOne({ serialno: req.params.serialno.toLocaleUpperCase() })
    if (data) {
        QRCode.toDataURL(`Date = ${data.issueddate} / AssetID : ${req.body.assetID.toLocaleUpperCase()} / SerialNo : ${req.body.serialno.toLocaleUpperCase()} / Assigned To = ${data.towhom} / Remarks =  ${data.remark}`, function (err, url) {
            data.issueddate = data.issueddate;
            data.assignasset = `AssetID : ${req.body.assetID.toLocaleUpperCase()} / SerialNo : ${req.body.serialno.toLocaleUpperCase()}`;
            data.serialno = req.body.serialno.toLocaleUpperCase();
            data.towhom = data.towhom;
            data.remark = data.remark;
            data.qrcode = url;
            data.save();
            res.json({ message: 'Updated Successfully' })
        })
    }
})




//Delete one Asset
router.delete('/deleteoneasset/:serialno', async (req, res) => {
    await AddAsset.findOneAndDelete({ serialno: req.params.serialno.toLocaleUpperCase() });
    res.json('Deleted Successfully')
})

//Delete one Assigned Asset
router.delete('/deleteoneassignasset/:serialno', async (req, res) => {
    await AssignAsset.findOneAndDelete({ serialno: req.params.serialno.toLocaleUpperCase() });
    res.json('Deleted Successfully')
})

//Delete one Idle Asset
router.delete('/deleteoneidleasset/:serialno', async (req, res) => {
    await IdleAsset.findOneAndDelete({ serialno: req.params.serialno.toLocaleUpperCase() });
    res.json('Deleted Successfully')
})

//Delete one Idle Asset
router.delete('/deleteoneDamagedasset/:serialno', async (req, res) => {
    await DamageAsset.findOneAndDelete({ serialno: req.params.serialno.toLocaleUpperCase() });
    res.json('Deleted Successfully')
})

module.exports = router;

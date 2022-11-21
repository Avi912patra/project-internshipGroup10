const collegeModel=require("../models/collegeModel")

const createCollege=async function(req,res){
    try{
        let { name, fullName, logoLink } = req.body
        let body = req.body

        let bodydata = Object.keys(body)
        if (bodydata.length == 0) { return res.status(400).send({ status: false, msg: "body is empty" }) }

    
        if (!name) { return res.status(400).send({ status: false, msg: "name is mandatary" }) }
        if (!fullName) { return res.status(400).send({ status: false, msg: "fullname is mandatary" }) }
        if (!logoLink) { return res.status(400).send({ status: false, msg: "logoLink is mandatary" }) }

        let collegeCreated = await collegeModel.create(req.body )
        res.status(201).send({ data: collegeCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createCollege=createCollege

//get college ===================

//find college---
//got collgege details

//second find quesris for interns
//get collegeid fronm abobe data
//find all the inters

//res { data:"name":college.abrivation,
    // "fullName":coolege.fullName ,
    // "logoLink":link,
// interns:Interns jo hune find kare the
// }


const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const validation=require("../validation/validation")


const createCollege=async function(req,res){
    try{
        let { name, fullName, logoLink } = req.body
        let body = req.body

        let bodydata = Object.keys(body)
        if (bodydata.length == 0) { return res.status(400).send({ status: false, msg: "body is empty" }) }

    
        if (!validation.isValidName(name)) { return res.status(404).send({ status: false, msg: "Enter valid name " }) }
        if (!fullName) { return res.status(404).send({ status: false, msg: "fullname is mandatary" }) }
        if (!logoLink) { return res.status(400).send({ status: false, msg: "logoLink is mandatary" }) }
        const validateLogoLink=url.isUri(logoLink)
        if(!validateLogoLink){
            return res.status(404).send({status:false,msg:"Enter valid logo link"})
        }
        const Resgisteredname=await collegeModel.findOne({name})
        if(Resgisteredname){
            return res.status(400).send({status:false,msg:"Name is already registered"})
        }

        let collegeCreated = await collegeModel.create(req.body )
        res.status(201).send({ data: collegeCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const collegeDetails=async function(req,res){
try{
    let data=req.query
    const{collegeName}=data
    if(Object.keys(data)==0){
        return res.status(400).send({status:false,msg:"Enter College Name"})
    }
    let findCollege=await collegeModel.findOne({name:collegeName,isDeleted:false}).select({_id:1,name:1,logoLink:1,fullName:1})
    if(!findCollege){
        res.status(400).send({status:false,msg:"College name is already exists"})
    }
    let collegeId=findCollege._id

    let internData= await internModel.find({collegeId:collegeId,isDeleted:false}).select({name:1,email:1,mobile:1})
    if(!internData){
        res.status(400).send({status:false,msg:"NoOne apply for this college"})
    }
    let details={
        name:findCollege.name,
        fullName:findCollege.fullName,
        logoLink:findCollege.logoLink,
        interns:internData
    }
        return res.status(200).send({status:true,data:details})}
    catch(error){
        return res.status(200).send({status:false,error:error.message})

    }
    }



module.exports.createCollege=createCollege
module.exports.collegeDetails=collegeDetails


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


const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const validation=require("../validation/validation")

const createIntern = async (req, res) => {
    try {
       
    const data = req.body;
    let { name, email, mobile, collegeName } = data;
    
    if(Object.keys(data)==0){return res.status(400).send({Status:false,msg:"Body is empty"})}

    if (!validation.isValidname(name)){
      return res.status(400).send({ status: false, massege: " Name is required" })}

     if (!validation.isValidMobileNo(mobile)){
       return res.status(400).send({ status: false, message: "Enter valid mobile no" })}

       isMobileAlreadyExisted=await internModel.findOne({mobile})
       if(isMobileAlreadyExisted){
        return res.status(400).send({status:false,msg:"This mobile no is already used"})

       }

       isEmailAlreadyExisted=await internModel.findOne({email})
       if(isEmailAlreadyExisted){
        return res.status(400).send({status:false,msg:"This email is already used"})
       }

       if(!validation.isvalidEmail(email)){
        return res.status(404).send({status:false,msg:"Enter valid email"})
       }

       if(!validation.isvalidCollege(collegeName)){
        return res.status.send({status:false,msg:"Enter valid college Name"})
       }

       const findcollege=await collegeModel.findOne({name:collegeName})
       if(!findcollege){
        return res.status(400).send({status:false,msg:"such college not exists"})
       }

       const collegeId=findcollege._id
       const internData={
        name:name,
        mobile:mobile,
        email:email,
        collegeId:collegeId,
       }
       const findIntern=await internModel.findOne(internData)
       if(findIntern){
        return res.status(400).send({status:false,msg:"student already exists with this data"})
       }

       const createIntern=await internModel.create(internData)
       if(createIntern){
        return res.status(201).send({status:true,msg:"Data is created",data:createIntern})
       }
      }catch(error){
        return res.status(500).send({status:false,msg:error.massege})
      }
}

     


module.exports.createIntern = createIntern

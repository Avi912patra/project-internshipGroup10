const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel")



 const createIntern = async(req,res) => {
    try {
        const data=req.body;
        let{name,email,mobile,collegeName} =data;
        if(!isvalidBody(data)){return res.status(400).send({status :false, massege: "details are required"})}

        if(!name) return res.status(400).send ({status : false, massege: "required your name"})
        if(!isValidintern(name)) return res.status(400).send({status:false,message: "enter valid Name"})

        if(!email) return res.status(400).send({status:false, msg:"Enter your valid Email Id"})
        if(!isvalidemail(email)) return res.status(400).send({Status:false, msg:"Enter a valid Email Id"})

        let emailExited =await internModel.findOne({email:email})
        if(emailExited) return res.status(400).send({status:false, msg:"Email alredy existed, try again "});

        if(!mobile) return res.Status(400).send({status : false, message:"Enter your Mobile Number"})
        if(!isvalidMobile(mobile.trim())) return res.Status(400).send({status:false,massege:"number must be 10 digits"})

        let existedMobile = await internModel.findOne({mobile})
        if(existedMobile) return res.status(400).send({Status:false, massege:"this number alredy have"})

        if (!collegeName) return res.Status(400).send ({status:false, massege:"Enter the college name"})
        if(!isvalid(collegeName)) return res.status(400).send({Status:false, massege:"Enter valid college Name"})

        let collegeData = await collegeModel.findOne({name:collegeName})
        if(!collegeData) return res.Status(404).send({Status:false, massege:"No college found"})


        //data.collegeId = collegeData._id.toString()// assign collegeID in properties of dATA
        let newIntern ={
            name: internData.name,
            email: internData.email,
            mobile: internData.mobile,
            collegeId:collegeId ,
            isDeleted:internData.isDeleted
        }

        let internData= await internModel.create(newIntern)

        return res.status(201).send({status: true, data:newIntern})

    }catch(err){
        res.status(500).send({status:false, massege:err.massege})
    }
}

module.exports.createIntern=createIntern;
const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

const createIntern = async (req, res) => {
    try {
       
    const data = req.body;
      let { name, email, mobile, collegeName } = data;
      console.log('hey')
    // if (!isvalidBody(data)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, massege: "details are required" });
    // }
console.log('heloo1')
    if (!name)
      return res
        .status(400)
              .send({ status: false, massege: "required your name" });

    // if (!isValidintern(name))
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "enter valid Name" });
    //     console.log('hehhhh')
    if (!email)
      return res
        .status(400)
              .send({ status: false, msg: "Enter your valid Email Id" });
              console.log('hehhhh')
    // if (!isvalidemail(email))
    //   return res
    //     .status(400)
    //     .send({ Status: false, msg: "Enter a valid Email Id" });
    //     console.log('hehhhh')
    let emailExited = await internModel.findOne({ email: email });
    if (emailExited)
      return res
        .status(400)
        .send({ status: false, msg: "Email alredy existed, try again " });
      console.log('hehhhh')
      
    if (!mobile)
      return res
        .Status(400)
              .send({ status: false, message: "Enter your Mobile Number" });
      
      console.log('hehhhh')
    // if (!isvalidMobile(mobile.trim()))
    //   return res
    //     .Status(400)
    //     .send({ status: false, massege: "number must be 10 digits" });

    let existedMobile = await internModel.findOne({ mobile });
    if (existedMobile)
      return res
        .status(400)
        .send({ Status: false, massege: "this number alredy have" });

    if (!collegeName)
      return res
        .Status(400)
        .send({ status: false, massege: "Enter the college name" });
    // if (!isvalid(collegeName))
    //   return res
    //     .status(400)
    //     .send({ Status: false, massege: "Enter valid college Name" });

      let collegeData = await collegeModel.findOne({ name: collegeName })
//null
        //{name:fkdjfk}

      if (!collegeData) {
         return res.status(404).send({status:false,message:"Given college does not exist"})
        }
        
      data['collegeId'] = collegeData._id



    let internData = await internModel.create(data);
    return res.status(201).send({ status: true, data: internData });
  } catch (err) {
    res.status(500).send({ status: false, massege: "no msg" });
  }
};



module.exports.createIntern = createIntern;

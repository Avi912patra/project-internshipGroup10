const mongoose=require("mongoose")

const isValidName=function(name){
    const regexName="^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)"

    return regexName.test(name)
}

const isValidMobileNo=function(mobile){
    const remob=" /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/"
    return remob.test(mobile)
}

const isValidFullName=function(fullName){
    const refullName="^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)"
    
    return refullName.test(fullName)
}

const isvalidEmail=function(email){
    const reemail=/\S+@\S+\.\S+/;
    return reemail.test(email)
}

module.exports ={isvalidEmail,isValidFullName,isValidMobileNo,isValidName}
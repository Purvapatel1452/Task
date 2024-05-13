
const mongoose=require('mongoose')

const otpData=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    expiryTime:{
        type:Date,
        required:true
    }
})


const OTPData=mongoose.model('OTPData',otpData)


module.exports=OTPData



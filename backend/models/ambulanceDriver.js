import mongoose from "mongoose";

const ambulanceDriverSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    profession:{
        type:String,
        default: "Ambulance Driver",
    },
    
},{
    timeStamps:true
})


const AmbulanceDriver = mongoose.model("AmbulanceDriver", ambulanceDriverSchema);

export default AmbulanceDriver;
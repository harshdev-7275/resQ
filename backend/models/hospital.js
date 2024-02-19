import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({
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
    location:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default: true,
    },
    profession:{
        type:String,
        default: "Hospital",
    },
    
},{
    timeStamps:true
})


const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;
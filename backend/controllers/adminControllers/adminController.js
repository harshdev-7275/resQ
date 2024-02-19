import Admin from "../../models/admin.js";
import AmbulanceDriver from "../../models/ambulanceDriver.js";
import bcrypt from 'bcryptjs';
import createToken from "../../utils/createToken.js"
import asyncHandler from "../../middleware/asyncHandler.js"
import TrafficPolice from "../../models/trafficPolice.js";
import Hospital from "../../models/hospital.js";


const createAdmin = asyncHandler(async (req, res) => {
    const {name, password, email, isAdmin} = req.body;
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).send('Admin already exists!')
    }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
        name,
        email,
        password:hashedPassword,
        isAdmin,
    })

    try {
        await newAdmin.save()
        return res.status(200).json({
            _id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email,
            isAdmin: newAdmin.isAdmin
        })
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data")
    }
})

const loginAdmin = asyncHandler(async(req, res)=>{
    const {email, password,} = req.body;
    console.log(password);
    const existAdmin = await Admin.findOne({email});
    if(!existAdmin){
        return res.status(400).json({
            message: "User not exist"
        })
    }
    const isAdmin = existAdmin.isAdmin;
   
    if(isAdmin){
        console.log(existAdmin.password);
        
        const passwordValid = await bcrypt.compare(password, existAdmin.password);
        console.log(passwordValid);
        if(passwordValid){
            createToken(res, existAdmin._id);

            res.status(201).json({
                _id: existAdmin._id,
                name: existAdmin.name,
                email: existAdmin.email,
                isAdmin: existAdmin.isAdmin
            })
        }else{
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
    }

})




const createAmbulanceDriver = asyncHandler(async(req, res)=>{
    const {name, email, password, phoneNumber} = req. body;

    const policeExist = await TrafficPolice.findOne({email});
    const driverExists = await AmbulanceDriver.findOne({email});


    if(driverExists ||policeExist){
        return res.status(400).json({
            message: "Ambulance driver already exists"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAmbulanceDriver = new AmbulanceDriver({
        name,
        email,
        password:hashedPassword,
        phoneNumber
    })

    await newAmbulanceDriver.save();

    res.status(201).json({
        _id: newAmbulanceDriver._id,
        name: newAmbulanceDriver.name,
        email: newAmbulanceDriver.email,
        phoneNumber: newAmbulanceDriver.phoneNumber,
        profession: newAmbulanceDriver.profession
    })

})

const updateAmbulanceDriver = asyncHandler(async(req, res)=>{
    const {id} = req.params;
   
    const {name, email, password, phoneNumber} = req.body;
    console.log(id, email, password, phoneNumber);

    if(!name || !email ||!phoneNumber){
        throw new Error("Please provide proper details!")
    }

    const driver =  await AmbulanceDriver.findOne({_id:id});
    if(!driver){
        throw new Error("Driver not found!")
    }
    driver.name = name;
    driver.email = email;
    driver.phoneNumber = phoneNumber;
    if(password){
        driver.password = await bcrypt.hash(password, 10)
    }
    await driver.save()
    res.status(200).json({
        message: 'Driver updated successfully',
      });

})
const deleteAmbulanceDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const driver = await AmbulanceDriver.findOne({ _id: id });
    if (!driver) {
      throw new Error('Driver not found');
    }
    await driver.deleteOne();
  
    res.status(200).json({
      message: 'User deleted successfully',
    });
  });

const createTrafficPolice = asyncHandler(async(req, res)=>{
    const {name, email, password, phoneNumber, location ,status} = req. body;

    const policeExist = await TrafficPolice.findOne({email});
    const driverExists = await AmbulanceDriver.findOne({email});
    

    if(policeExist || driverExists ){
        return res.status(400).json({
            message: "User already exist already exists"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newTrafficPolice = new TrafficPolice({
        name,
        email,
        password:hashedPassword,
        phoneNumber,
        location,
        status
    })

    await newTrafficPolice.save();

    res.status(201).json({
        _id: newTrafficPolice._id,
        name: newTrafficPolice.name,
        email: newTrafficPolice.email,
        phoneNumber: newTrafficPolice.phoneNumber,
        profession: newTrafficPolice.profession,
        location: newTrafficPolice.location,
        status: newTrafficPolice.status
    })

})
const updateTrafficPolice = async(req, res)=>{
    console.log("hi");
   try {
    
    const {id} = req.params;
    const {name, email, password, phoneNumber, location, status} = req.body;

    

    const police =  await TrafficPolice.findOne({_id:id});
    if(!police){
        throw new Error("Police not found!")
    }
    police.name = name|| police.name;
    police.email = email || police.email;
    police.phoneNumber = phoneNumber;
    police.location = location || police.location;
    police.status = status || police.status;
    if(password){
        police.password = await bcrypt.hash(password, 10)
    }
    await police.save()
    res.status(200).json({
        message: 'Police updated successfully',
      });
   } catch (error) {
    console.log(error);
   }

}
const deleteTrafficPolice = async (req, res) => {
   
   try {
    
    const { id } = req.params;
    
    
    const police = await TrafficPolice.findOne({ _id: id });
    
    
    if (!police) {
      throw new Error('Police not found');
    }
    await police.deleteOne();
  
    res.status(200).json({
      message: 'Police deleted successfully',
    });
   } catch (error) {
    console.log(error);
   }
  };

const createHospital = asyncHandler(async(req, res)=>{
    const {name, email, password, phoneNumber, location ,status} = req. body;

    const policeExist = await TrafficPolice.findOne({email});
    const driverExists = await AmbulanceDriver.findOne({email});
    const hospitalExists = await Hospital.findOne({email});
    

    if(policeExist || driverExists || hospitalExists ){
        return res.status(400).json({
            message: "User already exist already exists"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newHospital = new Hospital({
        name,
        email,
        password:hashedPassword,
        phoneNumber,
        location,
        status
    })

    await newHospital.save();

    res.status(201).json({
        _id: newHospital._id,
        name: newHospital.name,
        email: newHospital.email,
        phoneNumber: newHospital.phoneNumber,
        profession: newHospital.profession,
        location: newHospital.location,
        status: newHospital.status
    })

})
const updateHospital = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const {name, email, password, phoneNumber, location, status} = req.body;

    if(!name || !email ||!phoneNumber || !location || !status){
        throw new Error("Please provide proper details!")
    }

    const hospital =  await Hospital.findOne({_id:id});
    if(!hospital){
        throw new Error("Hospital not found!")
    }
    hospital.name = name;
    hospital.email = email;
    hospital.phoneNumber = phoneNumber;
    hospital.location = location;
    hospital.status = status;
    if(password){
        hospital.password = await bcrypt.hash(password, 10)
    }
    await hospital.save()
    res.status(200).json({
        message: 'Hospital updated successfully',
      });

})
const deleteHospital = async (req, res) => {
   
    try {
        const { id } = req.params;
    // console.log(req);
    const hospital = await Hospital.findOne({ _id: id });
    if (!hospital) {
      throw new Error('Hospital not found');
    }
    await hospital.deleteOne();
  
    res.status(200).json({
      message: 'Hospital deleted successfully',
    });
    } catch (error) {
        console.log(error);
    }
  };


  const getAllAmbulanceDriver = async(req, res)=>{
    try {
        const drivers = await AmbulanceDriver.find();
        
        
        res.status(200).json(drivers)
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: error.message
        })
    }
  }

  

  const getAllTrafficPolice = async(req, res)=>{
    try {
        const tp = await TrafficPolice.find();
        
        
        res.status(200).json(tp)
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: error.message
        })
    }
  }

  const getAllHospital = async(req, res)=>{
    try {
        const hospitals = await Hospital.find();
        
        
        res.status(200).json(hospitals)
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: error.message
        })
    }
  }

  const getSingleWorker = async (req, res) => {
    
    try {
        const id = req.params.id; // Use req.params.id instead of req.query.id
        // console.log(id);

        // Search across all schemas using $or operator
        const result = await Promise.all([
            AmbulanceDriver.findOne({ _id: id }),
            TrafficPolice.findOne({ _id: id }),
            Hospital.findOne({ _id: id })
        ]);

        // Check if any of the results is not null
        const foundWorker = result.find(worker => worker !== null);

        if (foundWorker) {
            // Return the found worker
            return res.status(200).json(foundWorker);
        } else {
            // Return error message if no worker is found
            return res.status(404).json({ message: "Worker not found" });
        }
    } catch (error) {
        // Return error message if an error occurs
        return res.status(500).json({ message: error.message });
    }
}




export {createAdmin, loginAdmin, createAmbulanceDriver, createTrafficPolice, createHospital, updateAmbulanceDriver, deleteAmbulanceDriver, updateTrafficPolice , deleteTrafficPolice, updateHospital, deleteHospital, getAllAmbulanceDriver, getAllTrafficPolice, getAllHospital, getSingleWorker}
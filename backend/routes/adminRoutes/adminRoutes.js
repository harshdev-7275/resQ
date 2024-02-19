import express from "express";
import  {createAdmin, loginAdmin, createAmbulanceDriver, createTrafficPolice, createHospital, updateAmbulanceDriver, deleteAmbulanceDriver, updateTrafficPolice , deleteTrafficPolice, updateHospital, deleteHospital, getAllAmbulanceDriver, getAllTrafficPolice, getAllHospital, getSingleWorker } from "../../controllers/adminControllers/adminController.js";
// import {authenticateAdmin,authorizeAdmin } from "../../middleware/authMiddleware.js"

const router = express.Router();



router.route("/createAdmin" ).post(createAdmin);
router.route("/loginAdmin" ).post(loginAdmin);
router.route("/createAmbulanceDriver" ).post(createAmbulanceDriver);
router.route("/updateAmbulanceDriver/:id" ).put(updateAmbulanceDriver);
router.route("/deleteAmbulanceDriver/:id" ).delete(deleteAmbulanceDriver);

router.route("/createTrafficPolice" ).post(createTrafficPolice);
router.route("/updateTrafficPolice/:id" ).put(updateTrafficPolice);
router.route("/deleteTrafficPolice/:id" ).delete(deleteTrafficPolice);

router.route("/createHospital" ).post(createHospital);
router.route("/updateHospital/:id" ).put(updateHospital);
router.route("/deleteHospital/:id" ).delete(deleteHospital);

router.route("/getAllAmbulanceDriver" ).get(getAllAmbulanceDriver);

router.route("/getAllTrafficPolice" ).get(getAllTrafficPolice);

router.route("/getAllHospital" ).get(getAllHospital);
router.route("/getSingleWorker/:id" ).get(getSingleWorker);



export default router;
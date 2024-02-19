import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { amb } from '../data/amb';
import axios from "axios";

const AdminDashboard = () => {
    const [userInfo, setUserInfo] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false); // State to track data loading
    const [isAmbulance, setIsAmbulance] = useState(false);
    const [isTraffic, setIsTraffic] = useState(false);
    const [isHospital, setIsHospital] = useState(false);
  
    const [data, setData] = useState([])

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
            setDataLoaded(true); // Mark data as loaded
        }
        
    }, []);

    const trafficPoliceHandler =async ()=>{
        setIsAmbulance(false);
        setIsTraffic(true);
        setIsHospital(false);
        
        try {
            const res= await axios.get("http://localhost:4000/api/admin/getAllTrafficPolice");
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const ambulanceHandler =async ()=>{
        setIsAmbulance(true);
        setIsTraffic(false);
        setIsHospital(false);
        try {
            const res= await axios.get("http://localhost:4000/api/admin/getAllAmbulanceDriver");
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const hospitalHandler =async ()=>{
        setIsAmbulance(false);
        setIsTraffic(false);
        setIsHospital(true);
        try {
            const res= await axios.get("http://localhost:4000/api/admin/getAllHospital");
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='max-w-[1300px] mx-auto min-h-[57.9vh]'>
            <div className='container flex flex-col gap-20'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-semibold'>Welcome {dataLoaded && userInfo.name}...</h1>
                    <div className='flex items-center gap-4'>
                        <button  onClick={trafficPoliceHandler}  className='bg-green-400 px-2 py-1 rounded-md shadow-md shadow-black'>Traffic Police</button>
                        <button onClick={ambulanceHandler} className='bg-green-400 px-2 py-1 rounded-md shadow-md shadow-black'>Ambulance Driver</button>
                        <button onClick={hospitalHandler} className='bg-green-400 px-2 py-1 rounded-md shadow-md shadow-black'>Hospital</button>
                    </div>
                </div>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    {/* Render data dynamically */}
                    {dataLoaded && data.map((data, index) => (
                        <div key={index} className="p-4 flex items-center justify-between w-[700px] bg-green-100 rounded-md shadow-md hover:scale-110 transition-transform delay-200 ease-in-out cursor-pointer">
                            <div className='flex flex-col'>
                                <h1>Name: {data.name}</h1>
                                <h1>Email: {data.email}</h1>
                                <h1>Mob No: {data.phoneNumber}</h1>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <h1>Profession: {data.profession}</h1>
                                <Link to={`/admin/dashboard/${data._id}`}><h1 className='bg-green-400 px-4 py-1 rounded-md shadow-md'>View Details</h1></Link>
                            </div>
                        </div>
                    ))}
                    {isAmbulance && <Link to="/admin/dashboard/createAmbulance" className='my-4'>
                        
                            <h1 className='bg-green-400 px-3 py-2 rounded-md'>Add New AmbulanceDriver</h1>
                        
                        </Link>}
                        {isTraffic && <Link to="/admin/dashboard/createTraffic" className='my-4'>
                        
                            <h1 className='bg-green-400 px-3 py-2 rounded-md'>Add New Traffic Police</h1>
                        
                        </Link>}
                        
                        {isHospital && <Link to="/admin/dashboard/createHospital" className='my-4'>
                        
                            <h1 className='bg-green-400 px-3 py-2 rounded-md'>Add New Hospital</h1>
                        
                        </Link>}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminCRUD = () => {
    const [workerInfo, setWorkerInfo] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        profession: ''
    });
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetchWorker();
        setIsEdit(false);
        setIsDelete(false);
    }, []);

    const fetchWorker = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/admin/getSingleWorker/${params.id}`);
            if (res.data) {
                setWorkerInfo(res.data);
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    phoneNumber: res.data.phoneNumber,
                    profession: res.data.profession
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const editHandler = () => {
        setIsEdit(true);
        setIsDelete(false);
    }

    const deleteHandler = () => {
        setIsDelete(true);
        setIsEdit(false);
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const updateTrafficPolice = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/admin/updateTrafficPolice/${params.id}`, formData);
            if (res) {
                toast.success("Updated Successfully");
                console.log(res);
            }
        } catch (err) {
            console.log(err);
            toast.error("Update Failed");
        }
    }
    const updateAmbulanceDriver = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/admin/updateAmbulanceDriver/${params.id}`, formData);
            if (res) {
                toast.success("Updated Successfully");
                console.log(res);
            }
        } catch (err) {
            console.log(err);
            toast.error("Update Failed");
        }
    }
    const updateHospital = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/admin/updateHospital/${params.id}`, formData);
            if (res) {
                toast.success("Updated Successfully");
                console.log(res);
            }
        } catch (err) {
            console.log(err);
            toast.error("Update Failed");
        }
    }
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.profession === 'Traffic Police') {
            updateTrafficPolice()
        }
        if (formData.profession === 'Ambulance Driver') {
            updateAmbulanceDriver()
        }
        if (formData.profession === 'Hospital') {
            updateHospital()
        }
        // Implement logic to update worker information
        console.log(formData);
    }
const deleteTrafficPolice = async(e)=>{
    e.preventDefault();
    try {
        console.log(params.id);
        const res = await axios.delete(`http://localhost:4000/api/admin/deleteTrafficPolice/${params.id}`);
        toast.success("Deleted Successfully");
        if (res) {
            
            navigate("/admin/dashboard")
            console.log(res);
        }
    } catch (err) {
        console.log(err);
    }
}
const deleteAmbulanceDriver = async(e)=>{
    e.preventDefault();
    try {
        console.log(params.id);
        const res = await axios.delete(`http://localhost:4000/api/admin/deleteAmbulanceDriver/${params.id}`);
        toast.success("Deleted Successfully");
        if (res) {
            
            navigate("/admin/dashboard")
            console.log(res);
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteHospital = async(e)=>{
    e.preventDefault();
    try {
        console.log(params.id);
        const res = await axios.delete(`http://localhost:4000/api/admin/deleteHospital/${params.id}`);
        toast.success("Deleted Successfully");
        if (res) {
            
            navigate("/admin/dashboard")
            console.log(res);
        }
    } catch (err) {
        console.log(err);
    }
}

    const deleteHandlerData = (e)=>{
        
        e.preventDefault();
        if (formData.profession === 'Traffic Police') {
            deleteTrafficPolice(e)
        }
        if (formData.profession === 'Ambulance Driver') {
            deleteAmbulanceDriver(e)
        }
        if (formData.profession === 'Hospital') {
            deleteHospital(e)
        }
        
       
    }

    return (
        <div className='max-w-[1300px] min-h-[57.9vh]'>
            <div className='container'>
                <div className='px-4'>
                    {workerInfo && (
                        <div className='flex items-center justify-between'>
                            <button onClick={() => navigate("/admin/dashboard")} className='px-3 py-1 bg-green-400 rounded-md shadow-md'>Go Back</button>
                            <div className='text-xl font-semibold flex gap-4 items-center justify-center bg-green-200 rounded-md w-[700px] mx-auto p-4 ml-[15rem]'>
                                <div className='flex flex-col items-center'>
                                    <h1>{workerInfo.profession}</h1>
                                    
                                    <div className='flex items-center gap-6'>
                                            <h1>Name: {workerInfo.name}</h1>
                                            <h1>Email: {workerInfo.email}</h1>
                                                <h1>Mob No: {workerInfo.phoneNumber}</h1>
                                    
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div className='text-black flex items-center gap-2'>
                                <button onClick={editHandler} className='flex items-center gap-2 bg-green-400 px-4 py-2 rounded-md'>Edit <FaEdit /></button>
                                <button onClick={deleteHandler} className='flex items-center gap-2 bg-green-400 px-4 py-2 rounded-md'>Delete <MdDelete /></button>
                            </div>
                        </div>
                    )}
                    <div className='mt-10'>
                        {isEdit && (
                            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-10'>
                                <div className='flex gap-5'>
                                    <div className='flex w-[300px] flex-col gap-10'>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className='border-b-4 border-green-400 text-black outline-none' placeholder='Enter Name' autoFocus />
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className='border-b-4 border-green-400 text-black outline-none' placeholder='Enter Email' autoFocus />
                                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className='border-b-4 border-green-400 text-black outline-none' placeholder='Enter Password' />
                                    </div>
                                    <div className='flex w-[300px] flex-col gap-10'>
                                        <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className='border-b-4 border-green-400 text-black outline-none' placeholder='Enter Number' autoFocus />
                                        <input type="text" name="profession" value={formData.profession} onChange={handleInputChange} className='border-b-4 border-green-400 text-black outline-none' placeholder='Enter Profession' autoFocus />
                                    </div>
                                </div>
                                <div>
                                    <button type='submit' className='bg-green-500 text-white w-[300px] py-2 shadow-md rounded-md'>Update</button>
                                </div>
                            </form>
                        ) }
                        {
                            isDelete && <div className=' flex flex-col gap-4 items-center justify-center'>
                                    <h1 className='text-xl font bold'>Are You sure!</h1>
                                    <div className='flex gap-4 text-white font-bold'>
                                        <button onClick={deleteHandlerData} className='bg-green-500 px-4 py-1 rounded-md'>Yes</button>
                                        <button className='bg-red-500 px-4 py-1 rounded-md'>No</button>
                                    </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminCRUD;

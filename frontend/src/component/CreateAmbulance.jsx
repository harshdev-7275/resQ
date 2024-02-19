import React, { useState } from 'react';
import axios from "axios"
import {Link, useNavigate}  from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateAmbulance = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        profession: "Ambulance Driver"
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
       try {
        e.preventDefault();
        const res = await axios.post("http://localhost:4000/api/admin/createAmbulanceDriver", formData)
        console.log(res);
        toast.success("Ambulance driver created successfully!")
        navigate("/admin/dashboard")
       } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error);
       }
        
    };

    return (
        <div className='max-w-[1200px] min-h-[57.7vh] my-10'>
            <div className='container flex items-center flex-col justify-center gap-10 ml-28'>
                <div>
                    <h1 className='text-xl font-semibold'>Create New Ambulance Driver</h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-10 w-[400px]'>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='border-b-4 border-green-400 text-black outline-none'
                        placeholder='Enter Name'
                        autoFocus
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='border-b-4 border-green-400 text-black outline-none'
                        placeholder='Enter Email'
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className='border-b-4 border-green-400 text-black outline-none'
                        placeholder='Enter Password'
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className='border-b-4 border-green-400 text-black outline-none'
                        placeholder='Enter Phone Number'
                    />
                    <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                       
                        className='border-b-4 border-green-400 text-black outline-none'
                        placeholder='Enter Profession'
                    />
                    <button type="submit" className='bg-green-500 text-white w-[400px] py-2 shadow-md rounded-md text-center'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateAmbulance;

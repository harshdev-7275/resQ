import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTraffic = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        location: '',
        status: false, // Default status is false
        profession: 'Traffic Police'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        let value;
        if (e.target.name === 'status') {
            value = e.target.value === 'Yes'; // Convert 'Yes' to true, 'No' to false
        } else {
            value = e.target.value;
        }
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: value
        }));
    };
    
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await axios.post("http://localhost:4000/api/admin/createTrafficPolice", formData);
            console.log(res);
            toast.success("Traffic police created successfully!");
            navigate("/admin/dashboard");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || error);
        }
    };

    return (
        <div className='max-w-[1200px] min-h-[57.7vh] my-10'>
            <div className='container flex items-center flex-col justify-center gap-10 ml-28'>
                <div>
                    <h1 className='text-xl font-semibold'>Create New Traffic Police</h1>
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
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className='border-b-4 border-green-400 text-black outline-none'
                        placeholder='Enter Location'
                    />
                    <div className="flex items-center">
                        <label htmlFor="status">Status:</label>
                        <select
                            name="status"
                            id="status"
                            value={formData.status ? "Yes" : "No"}
                            onChange={handleChange}
                            className="ml-2 border-b-4 border-green-400 text-black outline-none"
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button type="submit" className='bg-green-500 text-white w-[400px] py-2 shadow-md rounded-md text-center'>Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateTraffic;

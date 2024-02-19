import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("userInfo")){
            setUserInfo(JSON.parse(localStorage.getItem("userInfo")))
        }
    },[])
// console.log(userInfo);
    const loginHandler = async (e) => {
        e.preventDefault();
        
        if (!email || !password ) {
            toast.error("Please fill in all fields!");
            return;
        }
        
       

        try {
            const res = await axios.post("http://localhost:4000/api/admin/loginAdmin", {
                email,
                password
            });
            
            if (res) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                toast.success(`Welcome ${res.data.name}`);
                setUserInfo(res.data);
                // console.log(userInfo);
                if(res.data.isAdmin){
                    navigate("/admin/dashboard")
                }
                
            }
            // console.log(res);
        } catch (error) {
            console.log(error);
            setEmail("");
            setPassword("");
            // Display error message received from the backend using toast notification
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='max-w-[1400px] h-[60.8vh] container mx-auto flex flex-col items-center gap-10 mt-10'>
            <h1 className='text-green-500 font-semibold text-3xl'>Login InTo Account</h1>
            <form onSubmit={loginHandler} className='flex flex-col items-start gap-10'>
                <div className='flex w-[300px] flex-col gap-10'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-b-4 border-green-400 text-black outline-none' placeholder='Enter Email' autoFocus />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-b-4 border-green-400 text-black outline-none' placeholder='Enter Password' />
                </div>
                <div>
                    <button type='submit' className='bg-green-500 text-white w-[300px] py-2 shadow-md rounded-md'>Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;

import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Header = () => {
  // State to store user information
  const [userInfo, setUserInfo] = useState({});
  
  // Effect to run once when the component mounts to check for user information in localStorage
  useEffect(() => {
    // Check if user information is stored in localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    // If user information is found, update the state with it
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    window.location.reload(); // Corrected to reload the page
  }
  
  return (
    <nav className='max-w-[1400px] container mx-auto relative'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className="w-[200px]">
          <img src={logo} alt="" className="object-contain w-full" />
        </div>
        {/* Navigation Links */}
        <div className='text-lg font-semibold flex items-center gap-6'>
          <Link to="/" className='hover:border-b-4 border-b-green-500 ease-in-out transition-all delay-150'>Home</Link>
          <Link className='hover:border-b-4 border-b-green-500 ease-in-out transition-all delay-150'>Services</Link>
          <Link className='hover:border-b-4 border-b-green-500 ease-in-out transition-all delay-150'>About Us</Link>
          <Link className='hover:border-b-4 border-b-green-500 ease-in-out transition-all delay-150'>Contact</Link>
        </div>
        {/* Conditional Rendering based on user information */}
        {userInfo.email ? (
          
          <div className='flex gap-3'>
           
          <div className="px-10 py-2 bg-green-400 rounded-md shadow-md shadow-black border-2">
           <button onClick={logoutHandler} className=''>Logout</button>
          </div>
          <div className="px-10 py-2 bg-green-400 rounded-md shadow-md shadow-black border-2">
          <Link to="/admin/dashboard">Go To Dashboard</Link>
          </div>
          
          </div>
        ) : (
          // Render login button if no user information exists
          <div className='text-black text-lg bg-green-500 px-10 py-2 rounded-md border-2 border-green-400 shadow-md shadow-green-400'>
            <Link to="/login">Login</Link>
            
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;

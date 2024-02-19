import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";




const Footer = () => {
  return (
    <div className=' bottom-0 max-w-[100vw] container bg-[#3d3c3c] text-[#cfcfcf] p-10'>
      <div className='container px-10'>
        <div className='flex items-center justify-between'>
          <ul className='text-lg flex flex-col gap-3'>
            <Link>
              <li className='hover:translate-x-2 transition-transform delay-100 hover:text-white'>Contact Us</li>
            </Link>
            <Link>
              <li  className='hover:translate-x-2 transition-transform delay-100 hover:text-white'>Our Policy</li>
            </Link>
            <Link>
              <li  className='hover:translate-x-2 transition-transform delay-100 hover:text-white'>About</li>
            </Link>
          </ul>
          <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-xl'>Connect Me!</h1>
            <ul className='flex items-center justify-between gap-5'>
              <Link><li className='hover:text-green-400 hover:shadow-md hover:shadow-green-400 hover:-translate-y-2 transition-all delay-100 ease-in'><FaLinkedinIn size={32}/></li></Link>
              <Link> <li className='hover:text-green-400 hover:shadow-md hover:shadow-green-400 hover:-translate-y-2 transition-all delay-100 ease-in'><FaGithub size={32}/></li></Link>
              <Link>  <li className='hover:text-green-400 hover:shadow-md hover:shadow-green-400 hover:-translate-y-2 transition-all delay-100 ease-in'><FaInstagram size={32}/></li></Link>
            </ul>
          </div>
          
          <div className='flex flex-col gap-4'>
            <h1 className='text-lg hover:text-white'>Get doctor-approved health tips, news, and more.</h1>
            <div className='flex items-center  border-green-400 border-2 rounded-md'>
              <input type="email" className='w-full p-2 text-black outline-none ' />
              <button className='px-2 bg-green-400 py-2 text-black font-semibold'>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
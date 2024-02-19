import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <div className='max-w-[1400px] container mx-auto'>{children}</div>
        <div className=''>
        <Footer/>
        </div>
        
    </div>
  )
}

export default Layout
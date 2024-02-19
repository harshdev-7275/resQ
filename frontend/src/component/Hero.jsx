import React from 'react';

const Hero = () => {
  return (
    <div className='max-w-[1400px] mx-auto container'>
    
        <div className='flex items-center flex-col mx-auto justify-center'>
          <div className='w-[1100px] h-[500px] rounded-md relative shadow-lg'> {/* Added relative positioning */}
            <img src={"https://images.unsplash.com/photo-1564947471495-f427662213cd?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" className='w-full object-cover rounded-md z-30 shadow-lg shadow-black h-full' />
          </div>
          <div className='mt-10'>
            <h1 className='text-5xl text-[#3d3c3c] font-bold text-center w-[850px]'>
              Gettting You Out Of Hurdle Is Our Responsibility
            </h1>
          </div>
        </div>
        
      
    </div>
  );
}

export default Hero;
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    
    <div className="fixed z-[100] inset-0 bg-black text-3xl text-white flex justify-center items-center overflow-hidden">
            Not Found

      <i 
    onClick={() => navigate(-1)} 
    className="absolute top-5 right-5 text-5xl hover:text-[#6556cd] ri-close-fill cursor-pointer"
  />

    </div>
  )
}

export default NotFound

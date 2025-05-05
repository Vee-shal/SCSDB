import React from 'react'
import Loader from "../../../public/Loading.gif"
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[50vh] w-[50vh]">
    <img src={Loader} alt="Loading..." />
  </div>
  )
}

export default Loading

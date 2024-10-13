import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {doctors,getAllDoctors, aToken} = useContext(AdminContext)
  useEffect(()=>{
  if (aToken) {
    getAllDoctors()
  }
  },[aToken])
  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {
          doctors.map((item,i)=>{
            <div>
              <img src={item.image} alt="" />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default DoctorsList

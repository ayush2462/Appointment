import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
  return (
    <div>
      <form>
        <p>Add Doctor</p>
        <div>
          <div>
            <label htmlFor="">
              <img src={assets.upload_area} alt="" />
            </label>
            <input type="file" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor

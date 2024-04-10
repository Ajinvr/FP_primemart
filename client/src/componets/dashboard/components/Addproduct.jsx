// eslint-disable-next-line eqeqeq
import React, { useEffect, useState } from 'react'
import "../../../styles/addproduct.css"





function Addproduct() {
  
  const [file, setfile] = useState(null)
  const [preview, setpreview] = useState(null);


const handlefilechange = async (e) => {
  setfile(e.target.files[0])
 
  const selectedFile = URL.createObjectURL(e.target.files[0]);
  setpreview(selectedFile)
  
}

  return (
   <div className='allign-div'>
       <div className='Add-product-div-main'>
           
            <div className="Add-product-div-p1">
                <div style={{margin:'10px 20px'}}>
                    {preview ? (
                                <img className='previwe-img' src={preview} alt="d" />
                             ):(
                                <div className='previwe-img'><h3>No images chosen yet</h3></div>
                    )}
                    <div className='file-upload-div'>
                        <input id='product-img' onChange={handlefilechange} type="file" className='file-input-addproduct' accept="image/*" />
                             <h6 style={{cursor:'pointer'}} >choose an image</h6>
                    </div>
              </div>
            </div>

            <div className="Add-product-div-p2">
                 <label htmlFor="title">Title</label>
                 <br />
                 <input type="text" />
                 <br />
                
                 <label htmlFor="title">Title</label>
                 <br />
                 <input type="text" />
                 <br />
                
                 <label htmlFor="title">Title</label>
                 <br />
                 <input type="number" />
                 <br />
                 
                 <label htmlFor="title">Title</label>
                 <br />
                 <input type="text" />
                 <br />
               
                 <label htmlFor="title">Title</label>
                 <br />
                 <input type="text" />
               
                 
            </div> 
      </div>
             
   </div>
  )
}

export default Addproduct
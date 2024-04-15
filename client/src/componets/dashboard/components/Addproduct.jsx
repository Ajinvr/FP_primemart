import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../../../styles/addproduct.css";
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';
import 'react-toastify/dist/ReactToastify.css';
function Addproduct() {

  const user = useSelector(state => state.auth.value);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [iscreating,setiscreating] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });

    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
        const selectedFile = URL.createObjectURL(e.target.files[0]);
        setPreview(selectedFile);
    }

    const handleChange = (event, field) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSubmit = async () => {
      if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.quantity || !file) {
          notify('All fields are required.','error');
          return;
      }
  
      try {
          setiscreating(true);
  
          const formDataToSend = new FormData();
          formDataToSend.append('title', formData.title);
          formDataToSend.append('description', formData.description);
          formDataToSend.append('category', formData.category);
          formDataToSend.append('price', formData.price);
          formDataToSend.append('quantity', formData.quantity);
          formDataToSend.append('file', file);
  
          // Sending the formDataToSend to the server using axios
          const response = await axiosInstance.post('/addproduct', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        });
        
          console.log(response.data);
          setiscreating(false);
          notify(response.data.message,response.data.toaststatus);
      } catch (error) {
          setiscreating(false);
          notify('Error occurred while creating listing', 'error');
      }
  };
  

  const notify = (message, status) => {
    
    toast[status](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

    return (
        <div className='allign-div'>
          {iscreating ? (<div className='loading-div-addproduct'><h1>creating listing...</h1></div>
          ):(
            <div className='Add-product-div-main'>
                <div className="Add-product-div-p1">
                    <div>
                        {preview ? (
                            <img className='previwe-img' src={preview} alt="d" />
                        ) : (
                            <div className='previwe-img'><h3>No images chosen yet</h3></div>
                        )}
                        <div className='file-upload-div'>
                            <input id='product-img' onChange={handleFileChange} type="file" className='file-input-addproduct' accept="image/*" />
                            <h6 style={{cursor:'pointer'}} >choose an image</h6>
                        </div>
                    </div>
                </div>
                <div className="Add-product-div-p2">

                    {/* Title */}
                    <label htmlFor="title">Title</label>
                    <br />
                    <textarea className="chat-box" value={formData.title} onChange={(event) => handleChange(event, 'title')}/>
                    <br />

                    {/* Description */}
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea cols='34' className="chat-box" value={formData.description} onChange={(event) => handleChange(event, 'description')}/>
                    <br />

                    {/* Category */}
                    <label htmlFor="category">Category</label>
                    <br/>
                    <input type="text" value={formData.category} onChange={(event) => handleChange(event, 'category')}/>
                    <br />

                    {/* Price */}
                    <label htmlFor="price">Price</label>
                    <br />
                    <input type="number" value={formData.price} min="1" onChange={(event) => handleChange(event, 'price')}/>
                    <br />

                    {/* Quantity */}
                    <label htmlFor="quantity">Quantity</label>
                    <br />
                    <input type="number" min="1" value={formData.quantity} onChange={(event) => handleChange(event, 'quantity')}/>
                    <br />

                    <div className='add-product-button-div'>
                    <button className='add-product-button' onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
               
            </div>
            )}
            <ToastContainer/>
        </div>
    )
}

export default Addproduct;

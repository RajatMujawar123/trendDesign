import React, { useState } from 'react'
import '../Css/AddProduct.css'

const AddProduct = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    image: null,
    category: '',
    price: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'image/png') {
      setFormData(prev => ({
        ...prev,
        image: file
      }))
    } else {
      alert('Please select a PNG image file')
      e.target.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('itemName', formData.itemName)
      formDataToSend.append('image', formData.image)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('price', parseFloat(formData.price))

      const response = await fetch('http://localhost:8080/addtexturetshirt', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage('Product added successfully!')
        setFormData({
          itemName: '',
          image: null,
          category: '',
          price: ''
        })
        // Reset file input
        document.getElementById('image').value = ''
      } else {
        setMessage(data.msg || 'Error adding product')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container"> 
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="itemName" className="label">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            className="input"
            placeholder="Enter item name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="label">
            Image (PNG only)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept=".png"
            required
            className="file-input"
          />
          {formData.image && (
            <p className="file-selected">
              Selected: {formData.image.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category" className="label">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select"
          >
            <option value="">Select category</option>
            <option value="textured-Tshirt">textured-Tshirt</option>
            <option value="Plain">Plain</option>
            <option value="Design">Design</option>
            <option value="Printed">Printed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price" className="label">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="input"
            placeholder="Enter price"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`submit-btn ${loading ? 'disabled' : ''}`}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </div>

      {message && (
        <div className={`message ${
          message.includes('successfully') 
            ? 'success' 
            : 'error'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default AddProduct
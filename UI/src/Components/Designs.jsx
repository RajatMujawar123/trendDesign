import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrintedT from "../Css/PrintedT.css";
import whatsApp from "../Components/Images/icons8-whatsapp-48.png";
import '../Css/HomePage.css';
import { useParams } from 'react-router-dom';

const Designs = () => {
  const [products, setProducts] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    
    axios.get(`http://localhost:8080/getTshirtsCategoryWise/${category}`)
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [category]);

  return (
     <div>
      <h1 className="CategoryHead">Designs</h1>
      <div className="grid-container">
        {products.map((item) => {
          const message = `Hi! I'm interested in purchasing this:

📱 Product Details:
• Product ID: ${item._id}
• Name: ${item.itemName}
• Category: ${item.category}
• Price: ₹${item.price}

Thank you!`;
          
          const encodedMessage = encodeURIComponent(message);
          const whatsappLink = `https://wa.me/919823111057?text=${encodedMessage}`;
          
          return (
            <div key={item._id} className="grid-item">
              <img 
                src={`http://localhost:8080/${item.image}`} 
                alt={`${item.itemName}`} 
                style={{width: '100%', height: 'auto'}}
              />
              <div className="product-info">
                <h3>{item.itemName}</h3>
                <p>₹{item.price}</p>
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <img src={whatsApp} alt="WhatsApp" className="whatsapp-icon" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Designs;
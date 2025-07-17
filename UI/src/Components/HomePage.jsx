import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../Components/Images/AppLogo.png"
import textureLogo from "../Components/Images/Texture_Pattern.png"
import PrinterTeesLogo from "../Components/Images/Printer_Tees.png"
import PlainTeesLogo from "../Components/Images/Plain_Tees.png"
import CustomiseTeesLogo from "../Components/Images/Customise_Tees.png"
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const containerStyle = {
    margin: 'auto',
    marginTop: '40px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    width: '90%'
  };

  const innerDivStyle = {
    borderRadius: '18px',
    width: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    paddingBottom: '20px'
  };

  const imgStyle = {
    width: '100%',
    height: '85%',
    borderRadius: '18px'
  };

  const categoryHeadStyle = {
    textAlign: 'center',
    fontFamily: 'Cursive',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
  };

  // Media query styles for mobile
  const mobileContainerStyle = {
    ...containerStyle,
    flexWrap: 'wrap',
    marginTop: '20px'
  };

  const mobileInnerDivStyle = {
    ...innerDivStyle,
    height: '400px',
    border: 'solid black 1px',
    paddingBottom: '10px'
  };

  const mobileImgStyle = {
    ...imgStyle,
    height: '80%'
  };

  // Check if mobile (you can use a library like react-responsive for better mobile detection)
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <div style={isMobile ? mobileContainerStyle : containerStyle}>
        <div style={isMobile ? mobileInnerDivStyle : innerDivStyle}>
          <Link to="/PrintedCategory/Printed">
            <img src={PrinterTeesLogo} alt="" style={isMobile ? mobileImgStyle : imgStyle} />
          </Link>
          <h3 style={categoryHeadStyle}>Printed T-Shirts</h3>
        </div>

        <div style={isMobile ? mobileInnerDivStyle : innerDivStyle}>
          <Link to={`/texturedCategory/textured-Tshirt`}>
            <img src={textureLogo} alt="" style={isMobile ? mobileImgStyle : imgStyle} />
          </Link>
          <h3 style={categoryHeadStyle}>Texture T-Shirts</h3>
        </div>

        <div style={isMobile ? mobileInnerDivStyle : innerDivStyle}>
          <Link to="/plainCategory/Plain">
            <img src={PlainTeesLogo} alt="" style={isMobile ? mobileImgStyle : imgStyle} />
          </Link>
          <h3 style={categoryHeadStyle}>Plain T-Shirts</h3>
        </div>

        <div style={isMobile ? mobileInnerDivStyle : innerDivStyle}>
          <Link to="/designCategory/Design">
            <img src={CustomiseTeesLogo} alt="" style={isMobile ? mobileImgStyle : imgStyle} />
          </Link>
          <h3 style={categoryHeadStyle}>Designs</h3>
        </div>
      </div>
    </>
  );
};

export default HomePage;
import React from 'react'
import './Breadcrum.css' // Assuming you have a CSS file for styling
// Using a simple text arrow instead of SVG until the correct path is available
// import arrow_icon from '../Assets/arrow_icon.svg'; // Adjust the path as necessary


const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
        Home
      <span> → </span>
      SHOP <span> → </span>{" "}
      {product.category}
      <span> → </span>
      {product.name}
    </div>
  )
}


export default Breadcrum
import React, { useContext } from "react";
import "./ShopCategory.css"; // corrected path (file is in same folder)
import { ShopContext } from "../Context/ShopContext";
import Items from "../Components/Item/Items";

// Receives banner and category from route element props in App.js
const ShopCategory = ({ banner, category }) => {
  const { all_product } = useContext(ShopContext);

  // Filter products by category prop (men, women, kid)
  const filtered = all_product.filter((p) => p.category === category);

  return (
    <div className="shop-category">
      {banner && (
        <img
          className="shopcategory-banner"
          src={banner}
          alt={`${category} banner`}
        />
      )}
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filtered.length}</span> products
        </p>
        <div className="shopcategory-sort">
          <select>
            <option>Sort by Price</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {filtered.map((prod) => (
          <Items
            key={prod.id}
            id={prod.id}
            name={prod.name}
            image={prod.image}
            new_price={prod.new_price}
            old_price={prod.old_price}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try browsing other categories</p>
        </div>
      )}
      <button className="shopcategory-loadmore">Load More Products</button>
    </div>
  );
};

export default ShopCategory;

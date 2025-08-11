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
          <span>{filtered.length}</span> items
        </p>
        <div className="shopcategory-sort">Sort ▼</div>
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
        <p style={{ textAlign: "center", width: "100%", margin: "40px 0" }}>
          No products found.
        </p>
      )}
      <div className="shopcategory-loadmore">Load More</div>
    </div>
  );
};

export default ShopCategory;

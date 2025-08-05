import React from 'react'
import "./NewCollection.css";
import new_collections from './../Assets/new_collections';
import Items from '../Item/Items';



const NewCollection = () => {
  return (
    <div className="new-collection">
      <h1>New Collection</h1>
      <hr />
      <div className='collection'>
        {new_collections.map((item,i)=>{
            return      <Items
              key={i}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
        })}
      </div>
      
    </div>
  )
}

export default NewCollection
import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import { CartProvider, useCart } from "react-use-cart";

function Cart() {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
    } = useCart();
  
    if (isEmpty) return <h1 className='text-center pt-5'>Aucune réservation</h1>;
  
    return (
      <>
        <h1>Réservation ({totalUniqueItems})</h1>
  
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.quantity} x {item.name} &mdash;
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <button
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button onClick={() => removeItem(item.id)}>&times;</button>
            </li>
          ))}
        </ul>
      </>
    );
  }

export default Cart
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
      cartTotal,
      totalItems
    } = useCart();
  
    if (isEmpty) return <h1 className='text-center pt-5'>Aucune réservation</h1>;
    console.log(items)
    return (
      <>
        <div className="container">
            <h1>Réservation</h1>
            <div className="cart_container d-flex">
                <div className="cart_items flex-grow-1 p-3">
                    <ul className='list-group'>
                    {items.map((item) =>  (
                        
                        <li key={item.id} className="list-group-item d-flex align-items-center">
                        {item.name_d} / {item.quantity} jours
                        <button className='btn btn-outline-primary  mx-1 ms-auto btn-sm'
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >
                            -
                        </button>
                        <button className='btn btn-outline-primary mx-1 btn-sm'
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                            +
                        </button>
                        <button className='btn btn-outline-danger mx-1 btn-sm' onClick={() => removeItem(item.id)}>&times;</button>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="cart_recap p-3">
                    <h4 className="cart_title">Récapitulatif</h4>
                    <hr></hr>
                    <p className="cart_total">Total: {cartTotal}€</p>
                    <p className="cart_total">Total des drones: {totalItems}</p>

                </div>
            </div>

        </div>
      </>
    );
  }

export default Cart
import React, { useState, useEffect } from 'react'
import './Cart.css'
import Footer from '../Footer'
import { CartProvider, useCart } from "react-use-cart";
import { baseUrl } from "../../utils/fetchApi"
import { Link } from 'react-router-dom'
import Modal from 'styled-react-modal'

const StyledModal = Modal.styled`
    width: 20rem;
    height: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    border: none;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23, 0.8) 100%);
    color: white;
    `

function Cart() {

    const [message, setMessage] = useState()
    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        totalItems
    } = useCart();

    const displayDateStart = (key) => {
        return items[key].startDate ? new Date(items[key].startDate).toLocaleDateString() : ''
    }
    const displayDateEnd = (key) => {
        return items[key].endDate ? new Date(items[key].endDate).toLocaleDateString() : ''
    }

    const isConnected = () => {
        const auth = localStorage.getItem('user')
        if (auth) {
            return true
        } else {
            return false
        }
    }

    const handleOrder = () => {
        items.forEach( item => {
            let order = {
                user_id: JSON.parse(localStorage.getItem('user')).user._id,
                drone_id: item._id,
                startAt_o: item.startDate,
                endAt_o: item.endDate,
                createdBy_o: JSON.parse(localStorage.getItem('user')).user._id,
                createdAt_o: new Date(),
                report_o: 'Ok'
            }
            fetch(`${baseUrl}/orders`,{
                method:'post',
                body:JSON.stringify(order),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(res => {
                setMessage(res.message)
                removeItem(item._id)
            })
            .catch(err => setMessage(err.message))
        })
    }

    const [isOpen, setIsOpen] = useState(false)

    function toggleModal(e) {
		setIsOpen(!isOpen)
	}



    const checkout = () => {
        if (isConnected()) {
            handleOrder()
        } else {
            toggleModal()
        }
    }

    return (
        <>
        <div  className='hero'>
            <div className="hero_overlay">
                <img  src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
            </div>
            <h1 className='titleDrone'>Réservation</h1>
        </div>
        <div className="container">
            { message ? <h1 className='text-center pt-5'>{message}</h1> : isEmpty ? <h1 className='text-center pt-5'>Aucune réservation</h1> : (
            <div className="cart_container d-flex">
                <div className="cart_items flex-grow-1 p-3">
                    <h4 className="cart_title">Votre panier</h4>
                    <hr></hr>
                    <ul className='list-group'>
                    {items.map((item, key) =>  (
                        
                        <li key={item.id} className="list-group-item d-flex p-3">
                            <div className="item_image">
                                <img src='./images/img-9.png' alt='drone' className='cart_item__img w-100'></img>
                            </div>
                            <div className="item_details flex-grow-1 d-flex flex-column">
                                <div className="item_desc d-flex justify-content-between">
                                    <div className="item_title">{item.name_d}</div>
                                    <div>Du {displayDateStart(key)} au {displayDateEnd(key)}</div>
                                    <div className="item_price">{item.price}€/jours</div>
                                </div>
                                <div className='d-flex flex-grow-1 justify-content-between align-items-end'>
                                    
                                    <div className="item_remove">
                                        <Link to={"/products/"+ item.id}>
                                            <button className="btn btn-outline-primary">Modifier la date</button>
                                        </Link>
                                    </div>
                                    <div className="item_remove">
                                        <button className="btn btn-outline-danger" onClick={() => removeItem(item.id)}>Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        </li>

                    ))}
                    </ul>
                </div>
                <div className="cart_recap p-3">
                    <h4 className="cart_title">Récapitulatif</h4>
                    <hr></hr>
                    <p className="cart_total">Nombre de drone: {totalUniqueItems}</p>
                    <p className="cart_total">Total: {cartTotal}€</p>
                    <button className='btn btn-dark w-100' type="button" onClick={checkout}>Passer la réservation</button>
                </div>
            </div>
            )}
        </div>
        <StyledModal
            isOpen={isOpen}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}>
            <div className='logo'>Identifiez-vous</div>
            <Link className='hiddenbtn' to='/sign-in'><button className='myBtn'>CONNEXION</button></Link>
            <Link className='hiddenbtn' to='/sign-up'><button className='btnSignUp'>INSCRIPTION</button></Link>
        </StyledModal>
      </>
    );
}

export default Cart
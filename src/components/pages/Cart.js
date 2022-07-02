import React, { useState, useEffect } from 'react'
import './Cart.css'
import { CartProvider, useCart } from "react-use-cart"
import { baseUrl } from "../../utils/fetchApi"
import { Link } from 'react-router-dom'
import Modal from 'styled-react-modal'
import { getDaysBetweenTwoDates } from '../helper.js'


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
    } = useCart()

    const displayDateStart = (key) => {
        return items[key].startDate ? new Date(items[key].startDate).toLocaleDateString() : null
    }
    const displayDateEnd = (key) => {
        return items[key].endDate ? new Date(items[key].endDate).toLocaleDateString() : null
    }

    const isConnected = () => {
        const auth = localStorage.getItem('user')
        return auth ? true : false
    }


    //calcul du total de la location
    const totalPrice = () => {
        let total = 0
        let totalDays = getDaysBetweenTwoDates(items[0].startDate, items[0].endDate)
        totalDays <= 0 ?
            totalDays = 1 : totalDays = getDaysBetweenTwoDates(items[0].startDate, items[0].endDate)

        for (let key in items) {

            total += items[key].price
        }
        return total * totalDays
    }

    //frais logistique de 100
    const logistique = () => {
        return 100
    }

    const handleOrder = () => {
        items.forEach(item => {
            const order = {
                user_id: JSON.parse(localStorage.getItem('user')).user._id,
                drone_id: item._id,
                startAt_o: item.startDate,
                endAt_o: item.endDate,
                createdBy_o: JSON.parse(localStorage.getItem('user')).user._id,
                createdAt_o: new Date(),
                key_r: JSON.parse(localStorage.getItem('user')).user.key_r,
                report_o: 'commande initiale'
            }
            fetch(`${baseUrl}/orders`, {
                method: 'post',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    setMessage(res.message)
                    removeItem(item._id)
                    // redirect to /orders after countdown 5 secondes 
                    setTimeout(() => {
                        window.location.href = '/orders'
                    }, 5000)
                })
                .catch(err => setMessage(err.message))
        })
    }

    const [isOpen, setIsOpen] = useState(false)

    function toggleModal(e) {
        setIsOpen(!isOpen)
    }


    // si le user est connecté, on affiche le bouton pour commander
    const checkout = () => {
        if (isConnected()) {
            handleOrder()
        } else {
            toggleModal()
        }
    }

    return (
        <>
            <div className='hero'>
                <div className="hero_overlay">
                    <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                </div>
                <h1 className='titleDrone'>Réservation</h1>
            </div>
            <div className="container">
                {message ?
                    <h1 className='text-center pt-5'>{message}</h1>
                    :
                    isEmpty ?
                        <>
                            <h1 className='text-center pt-5'>Votre panier est vide !</h1>
                            <div className='fs-3 mt-4 d-flex justify-content-center'>
                                <div>Retourner au <a href='/products' className='text-dark '><u> catalogue</u></a></div>
                                <div className='mx-2'><a href='/' className='text-dark'> où à <u>l'accueil</u></a></div>

                            </div>
                        </>
                        :
                        (
                            <div className="cart_container d-flex ">
                                <div className="cart_items flex-grow-1 p-3 ">
                                    <h4 className="cart_title">Votre panier</h4>
                                    <hr></hr>
                                    <ul className='list-group'>
                                        {items.map((item, key) => (
                                            <li key={item.id} className="list-group-item d-flex p-3 flex-wrap">
                                                <div className="item_image">
                                                    <img src={`./images/${item.id}.png`} alt='drone' className='cart_item__img w-100'></img>
                                                </div>
                                                <div className="item_details flex-grow-1 d-flex flex-column">
                                                    <div className="item_desc d-flex justify-content-between mb-2 ">
                                                        <div className="item_title text-uppercase">{item.name_d}</div>
                                                        <div>Du {displayDateStart(key)} au {displayDateEnd(key)}</div>
                                                        <div className="item_price">{item.price}€/jours</div>
                                                    </div>
                                                    <div className='d-flex flex-grow-1 justify-content-between align-items-end'>

                                                        <div className="item_remove">
                                                            <Link to={"/products/" + item.id}>
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

                                    <p className="cart_total">Transport et préparation (forfait): {logistique()} €</p>
                                    <p className="cart_total">Nombre de jours: {getDaysBetweenTwoDates(items[0].startDate, items[0].endDate) <= 0 ? 1 : getDaysBetweenTwoDates(items[0].startDate, items[0].endDate)}</p>
                                    <p className="cart_total">Location: {totalPrice()} €</p>
                                    <p className="cart_total">Montant Total: {totalPrice() + logistique()} €</p>
                                    <button className='btn btn-dark w-100' type="button" onClick={checkout}>Valider mon panier</button>
                                </div>
                            </div>
                        )}
            </div>
            <StyledModal
                isOpen={isOpen}
                onBackgroundClick={toggleModal}
                onEscapeKeydown={toggleModal}>
                <div className='logo text-center'>Pour valider votre commande, choisissez une des deux options</div>
                <Link className='hiddenbtn' to='/sign-in'><button className='myBtn'>CONNEXION</button></Link>
                <Link className='hiddenbtn' to='/sign-up'><button className='btnSignUp'>INSCRIPTION</button></Link>
            </StyledModal>
        </>
    )
}

export default Cart
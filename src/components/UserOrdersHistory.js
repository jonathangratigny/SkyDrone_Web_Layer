import './ProductPage.css'
import React, { useState, useEffect } from 'react'
import './UsersDetails.css'
import { formatDate, getDaysBetweenTwoDates, logistique } from './helper'
import { Link } from 'react-router-dom'

function UserOrdersHistory() {

    const [orders, setOrders] = useState([])

    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}/orders/user/${authParsed.user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authParsed.token}`
                }
            })
            const allOrders = await data.json()
            setOrders(allOrders)
        }
        fetchData()
    }, [authParsed.token, authParsed.user._id])
    if (orders.length > 0) {
        return (
            <>
                <div className='hero' >
                    <div className="hero_overlay">
                        <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                    </div>
                    <h1 className='titleDrone'>Historique des réservations terminées</h1>
                </div>
                {
                    orders.map(order => order.state_o === 'Terminée' &&
                        <div className="container mt-3" key={order._id}>
                            <ul className='d-flex flex-column'>
                                <li className='d-flex flex-column card' >
                                    <div className='flex-row'>
                                        <h2 className='text-uppercase text-center'>{order.drone_id.name_d}</h2>
                                        <div className="item_image_history">
                                            <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img' />
                                        </div>
                                        <div className='fs-5'>
                                            <p>Date de la commande: {formatDate(order.createdAt)}.</p>
                                            <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                            <p>Nombre de jours de location effectifs: {getDaysBetweenTwoDates(order.startAt_o, order.endAt_o)} jour{getDaysBetweenTwoDates(order.startAt_o, order.endAt_o) > 1 ? "s" : null}</p>
                                            <p>Prix total: {
                                                order.drone_id.pricePerDay_d * getDaysBetweenTwoDates(order.startAt_o, order.endAt_o) + logistique() > 0 ?
                                                    order.drone_id.pricePerDay_d * getDaysBetweenTwoDates(order.startAt_o, order.endAt_o) + logistique()
                                                    : 0
                                            }€</p>
                                            <Link to={`../products/${order.drone_id._id}`}>Réservez à nouveau</Link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </>
        )
    } else {
        return (
            <><div className='hero'>
                <div className="hero_overlay">
                    <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                </div>
                <h1 className='titleDrone'>Historique des réservations terminées</h1>
            </div>
                <div className="cards_container">
                    <div className="cardProduct"  >
                        <div className="card__item__info">
                            <h5 className="cards__item__text d-flex">Vous n'avez pas de commandes</h5>
                            <hr></hr>
                            <p className="cards__item__desc"></p>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UserOrdersHistory
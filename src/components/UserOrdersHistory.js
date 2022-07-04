import './ProductPage.css'
import React, { useState, useEffect } from 'react'
import { baseUrl } from '../utils/fetchApi'
import './UsersDetails.css'
import { formatDate, getDaysBetweenTwoDates, logistique } from './helper'


function UserOrdersHistory() {

    const [orders, setOrders] = useState([])

    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)

    useEffect(() => {
        //recupere toutes les commandes de cet utilisateur
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/orders/user/${authParsed.user._id}`, {
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
        console.log(fetchData())
    }, [authParsed.token, authParsed.user._id])
    console.log(orders)
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
                        <div className="container" key={order._id}>
                            <ul className='d-flex flex-column mt-5 list-group'>
                                <li className='d-flex flex-column list-group-item' >
                                    <div className='d-flex flex-row'>
                                        <div className='d-flex flex-column'>
                                            <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                            <div className="item_image">
                                                <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img w-100' />
                                            </div>
                                            <p>Date de la commande: {formatDate(order.createdAt)}.</p>
                                            <p>Nombre de jours: {getDaysBetweenTwoDates(order.startAt_o, order.endAt_o)} jour{getDaysBetweenTwoDates(order.startAt_o, order.endAt_o) > 1 ? "s" : null}</p>
                                            <p>Prix total: {
                                                order.drone_id.pricePerDay_d * getDaysBetweenTwoDates(order.startAt_o, order.endAt_o) + logistique() > 0 ?
                                                    order.drone_id.pricePerDay_d * getDaysBetweenTwoDates(order.startAt_o, order.endAt_o) + logistique()
                                                    : 0
                                            }€</p>
                                            <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
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
                            <h5 className="cards__item__text d-flex">Vous n'avez pas encore de commande<span className='ms-auto'>hdwefj</span></h5>
                            <hr></hr>
                            <p className="cards__item__desc"></p>
                            <footer className='d-flex align-items-center'>
                                <span className="cards__item__price">€/jour</span>
                            </footer>

                            <div className="total mt-3">
                                <p><span className='fw-bold'>test</span></p>
                                <p><span className='fw-bold'>test</span></p>
                                <p><span className='fw-bold'>Prix Total </span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UserOrdersHistory
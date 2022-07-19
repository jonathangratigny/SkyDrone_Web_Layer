import React, { useState, useEffect } from 'react'
import { baseUrl } from '../utils/fetchApi'
import './UsersDetails.css'
import { formatDate, getDays, removeDay } from './helper'


function UserOrders() {

    const [orders, setOrders] = useState([])

    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)

    useEffect(() => {
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
    }, [authParsed.token, authParsed.user._id])


    if (orders) {
        return (
            <>
                <div className='hero'>
                    <div className="hero_overlay">
                        <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                    </div>
                    <h1 className='titleDrone'>Réservation en cours</h1>
                </div>
                {orders.length > 0 ?
                    <div className="container">
                        <ul className='d-flex flex-column mt-5 list-group'>
                            {
                                orders.map(order => (
                                    order.state_o === 'En attente de validation' ?
                                        <li className='d-flex flex-column list-group-item' key={order._id}>
                                            <div className='d-flex flex-row'>
                                                <div className='d-flex flex-column'>
                                                    <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                    <div className="item_image">
                                                        <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                    </div>
                                                    <div>
                                                        <p> État : <span className='text-warning' > {order.state_o}</span></p>
                                                        <p>Votre demande est à l'étude. Nous vous informerons de son status très prochainement.
                                                            (Dernière mise à jour il y a {getDays(order.createdAt, Date.now())} jour{getDays(order.createdAt, Date.now()) > 1 ? 's' : ''}).</p>
                                                    </div>
                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                </div>
                                            </div>
                                        </li>

                                        : order.state_o === 'Acceptée' ?
                                            <li className='d-flex flex-column list-group-item' key={order._id}>
                                                <div className='d-flex flex-row'>
                                                    <div className='d-flex flex-column'>
                                                        <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                        <div className="item_image">
                                                            <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                        </div>
                                                        <div>
                                                            <p>État : <span className='text-success'> {order.state_o}</span></p>
                                                            <p>Votre demande a été acceptée. Votre drone vous sera livré au plus tard le {formatDate(removeDay(order.startAt_o, 1))}.</p>
                                                            <p>Dernière mise à jour il y a {getDays(order.createdAt, Date.now())} jour{getDays(order.createdAt, Date.now()) > 1 ? 's' : ''}.</p>
                                                        </div>
                                                        <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                        <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                        <p><a href="#">Nous contacter</a></p>
                                                    </div>
                                                </div>
                                            </li>

                                            : order.state_o === 'Rejetée' ?
                                                <li className='d-flex flex-column list-group-item' key={order._id}>
                                                    <div className='d-flex flex-row'>
                                                        <div className='d-flex flex-column'>
                                                            <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                            <div className="item_image">
                                                                <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                            </div>
                                                            <div>
                                                                <p>État : <span className='text-danger'> {order.state_o}</span></p>
                                                                <p>Veuillez <a href='#'> nous contacter</a> pour plus de détails.</p>
                                                            </div>
                                                            <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                            <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                        </div>
                                                    </div>
                                                </li>

                                                : order.state_o === 'En cours' ?
                                                    <li className='d-flex flex-column list-group-item' key={order._id}>
                                                        <div className='d-flex flex-row'>
                                                            <div className='d-flex flex-column'>
                                                                <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                                <div className="item_image">
                                                                    <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                                </div>
                                                                <div>
                                                                    <p>État : <span className='text-info'> {order.state_o}</span></p>
                                                                    <p>Il reste {getDays(Date.now(), order.endAt_o)} jours de location.</p>
                                                                </div>
                                                                <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                                <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    : order.state_o === 'Terminée' ?
                                                        null
                                                        :
                                                        <li className='d-flex flex-column list-group-item' key={order._id}>
                                                            <div className='d-flex flex-row'>
                                                                <div className='d-flex flex-column'>
                                                                    <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                                                    <div className="item_image">
                                                                        <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img ' />
                                                                    </div>
                                                                    <div>
                                                                        <p>État : <span className='text-danger'> {order.state_o}</span></p>
                                                                        <p>Un probleme est survenu, nous allons vous contacter dans les plus brefs délais.</p>
                                                                    </div>
                                                                    <p>Date de la commande : {formatDate(order.createdAt)}.</p>
                                                                    <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}.</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                ))}
                        </ul>
                    </div>
                    :
                    <div className='container'>
                        <h1 className='text-center pt-5'>Aucune réservation en cours</h1>
                    </div>
                })
            </>
        )
    }
    else {
        return (
            <div className='container'>
                <h1 className='text-center pt-5'>Aucune réservation en cours</h1>
            </div>
        )
    }
}
export default UserOrders
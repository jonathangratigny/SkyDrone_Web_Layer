import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../utils/fetchApi'
import './UsersDetails.css'
import Footer from './Footer'

function UserOrders() {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

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
    }, [])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    // calcule le nombre de jours
    const getDays = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

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
                        {orders.map(order => (
                            <li className='d-flex flex-column list-group-item' key={order._id}>
                                <div className='d-flex flex-row'>
                                    <div className='d-flex flex-column'>
                                        <h2 className='text-uppercase'>{order.drone_id.name_d}</h2>
                                        <div className="item_image">
                                            <img src={`./images/${order.drone_id._id}.png`} alt={order.drone_id.name_d} className='cart_item__img w-100' />
                                        </div>
                                        <p>Date de la commande : {formatDate(order.createdAt)}</p>
                                        {order.state_o = 'En attente' ?
                                            <p> État : <span className='text-warning' > {order.state_o}</span> (dernière mise à jour il y a {getDays(order.createdAt, Date.now())} jour{getDays(order.createdAt, Date.now()) > 1 ? 's' : ''})</p>
                                            :
                                            <p> État : <span className='text-success'> {order.state_o}</span> (dernière mise à jour il y a {getDays(order.createdAt, Date.now())} jour{getDays(order.createdAt, Date.now()) > 1 ? 's' : ''})</p>
                                        }
                                        <p>Réservation du {formatDate(order.startAt_o)} au {formatDate(order.endAt_o)}</p>
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
            }
        </>
    )
}

export default UserOrders
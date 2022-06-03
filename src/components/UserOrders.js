import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../utils/fetchApi'
import './UsersDetails.css'
import Footer from './Footer';

function UserOrders () {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/orders`)
            const allOrders = await data.json()
            let userOrders = allOrders.filter(order => order.user_id === authParsed.user._id)
            setOrders(userOrders)
        }
        fetchData()
    }, [])

    console.log(orders)

    const formatDate = (date) => {
        return  new Date(date).toLocaleDateString()
    }

    return(
        <>
        <div className='hero'>
            <div className="hero_overlay">
                <img  src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
            </div>
            <h1 className='titleDrone'>Réservation en cours</h1>
        </div>
        <div className="container">
            <ul className='d-flex flex-column mt-5 list-group'>
                {orders.map(order => (
                    <li className='d-flex flex-column list-group-item' key={order._id}>
                        <div className='d-flex flex-row'>
                            <div className='d-flex flex-column'>
                                <h2>{order.drone_id}</h2>
                                <p>Début : {formatDate(order.startAt_o)}</p>
                                <p>Fin : {formatDate(order.endAt_o)}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default UserOrders
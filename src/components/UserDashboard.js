import React from 'react'
import './ServicesSection.css'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalState } from '../App'


const UserDashboard = () => {
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth)
    const navigate = useNavigate()
    const [state, dispatch] = useGlobalState()

    const logOut = () => {
        localStorage.clear()
        dispatch({ auth: false })
        navigate('/')
    }
    return (
        <>
            <div className='hero'>
                <div className="hero_overlay">
                    <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                </div>
                <h1 className='titleDrone'>Mon compte</h1>
            </div>
            <div className="container mt-3 dashboard-main">
                <h2 className='text-center mt-3'>Bienvenue {authParsed.user.firstName_u} {authParsed.user.lastName_u}</h2>
                <div className='dashboard-options d-flex flex-column align-items-center flex-lg-row justify-content-center'>
                    <Link to="/userdetails" className='hola mx-2'>
                        Mes informations
                    </Link>
                    <Link to="/orders" className='hola mx-2'>
                        Mes réservations
                    </Link>
                    <Link to="/ordershistory" className='hola mx-2'>
                        Mon historique
                    </Link>
                </div>
            </div>
        </>
    )
}

export default UserDashboard
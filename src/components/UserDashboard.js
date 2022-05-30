import React from 'react'
import './ServicesSection.css'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalState } from '../App';




const UserDashboard = () => {
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth);
    const navigate = useNavigate()
    const [state, dispatch] = useGlobalState();

    const logOut = () => {
        localStorage.clear()
        dispatch({ auth: false })
        navigate('/')
    }
    return(
        <>
        <div  className='hero'>
            <div className="hero_overlay">
                <img  src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
            </div>
            <h1 className='titleDrone'>Mon compte</h1>
        </div>
        <div className="container mt-3">
            <h2>Bienvenue {authParsed.user.firstName_u} {authParsed.user.lastName_u}</h2>
            <div className='d-flex flex-column mt-5'>
                <Link to="/mesinfos" className='hola'>
                    Informations personnelles
                </Link>
                <Link to="/orders" className='hola'>
                    Réservations en cours
                </Link>
                <Link to="/history" className='hola'>
                    Historique réservations
                </Link>
            </div>
            <div className='my-3'>
                {auth ? <Link className='btnSignUp' onClick={logOut} to='/'>DÉCONNEXION</Link> : ''}
            </div>
        </div>
        </>
    )
}

export default UserDashboard
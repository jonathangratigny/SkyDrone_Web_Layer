import React from 'react'
import './ServicesSection.css'
import Footer from './Footer';

function UserDashboard() {
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth);
    console.log(auth)
    return(
        <>
        <h1 className='titleServices'>MON COMPTE</h1>
        <h1>Bienvenue {authParsed.user.firstName_u} {authParsed.user.lastName_u}</h1>
        <div className='dashbb'>
            <a href=''><button className='hola'>Mes réservations en cours</button></a>
            <a href='/mesinfos'><button className='hola'>Informations personnelles</button></a>
            <a href=''><button className='hola'>Historique réservations</button></a>
        </div>
        <Footer />
        </>
    )
}

export default UserDashboard
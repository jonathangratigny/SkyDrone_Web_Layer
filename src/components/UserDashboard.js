import React from 'react'
import './ServicesSection.css'
import Footer from './Footer';
import './Dashboard.css'

function UserDashboard() {
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth);
    console.log(auth)
    return(
        <>
        <h1 className='titleUserAccount'>MON COMPTE</h1>
        <h2 className='nameWelcolme'>Bienvenue <span className='nameUser'>{authParsed.user.firstName_u} {authParsed.user.lastName_u}</span></h2>
        <div className='divBtnDashboard'>
            <a href=''><button className='hola'>Mes réservations en cours</button></a>
            <a href='/mesinfos'><button className='hola'>Informations personnelles</button></a>
            <a href=''><button className='hola'>Historique réservations</button></a>
        </div>
        <Footer />
        </>
    )
}

export default UserDashboard
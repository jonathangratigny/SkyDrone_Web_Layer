import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../utils/fetchApi'
import './UsersDetails.css'
import Footer from './Footer';

function UsersDetails () {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/users/${authParsed.user._id}`);
            const json = await data.json();
            setUsers(json)
        }
        fetchData()
    }, [])

    function deleteUser(){
        var confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")
        if(confirmDelete){
            let result = fetch(`${baseUrl}/users/${authParsed.user._id}`, {
                method:'DELETE',
                headers:{
                    'Content-Type':"application/json"
                }
            })
            console.log(result);
            localStorage.clear()
            alert('Votre compte a bien été supprimé !')
            navigate('/')
        }
    }

    return(
        <>
            <div className='detailsUsers'>
            <h1 className='titleServices'>mes informations personnelles</h1>
                <div>
                    <p>Votre nom : {authParsed.user.lastName_u}</p>
                    <p>Votre prénom : {authParsed.user.firstName_u}</p>
                </div>
                <p>Votre adresse email : {authParsed.user.email}</p>
                <p>Votre entreprise : {authParsed.user.company_u}</p>
                <p>SIRET : {authParsed.user.siret_u}</p>
                <p>Adresse de votre entreprise : {authParsed.user.address_u}</p>
                <p>Votre téléphone : {authParsed.user.phone_u}</p>

                <div className="submitSection">
                    <Link to='/updateuserdetails'>
                    <button
                        type="submit"
                        className="submitBox">modifier mes informations
                    </button>
                    </Link>
                    <button
                        onClick={deleteUser}
                        type="submit"
                        className="submitBoxDelete">supprimer mon compte
                    </button>
                </div>
            </div>
        <Footer />
        </>
    )
}

export default UsersDetails
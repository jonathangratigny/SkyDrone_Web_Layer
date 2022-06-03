import React, {useState} from 'react';
import { baseUrl } from '../utils/fetchApi'
import { useNavigate } from "react-router-dom"
import './Dashboard.css'
import Footer from './Footer';

const UpdateUsersDetails = () => {
    const [lastName_u, setLastName] = useState('')
    const [firstName_u, setFirstName] = useState('')
    const [company_u, setCompany] = useState('')
    const [phone_u, setPhone] = useState('')
    const [address_u, setAdress] = useState('')
    const [siret_u, setSiret] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [key_r, setKey_r] = useState('0')

    // function handleChange(event){
    //     setFormData(prevFormData => {
    //         return {
    //             ...prevFormData,
    //             [event.target.name]: event.target.value
    //         }
    //     })
    // }

    const navigate = useNavigate()

    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth);
    console.log(JSON.parse(auth))

    function updateUserDetails(){
        let result = fetch(`${baseUrl}/users/${authParsed.user._id}`, {
            method:'PATCH',
            body:JSON.stringify(auth),
            headers:{
                'Content-Type':"application/json"
            }
        })
        
        localStorage.setItem('user', auth)
        alert('Vos informations ont été modifiées avec succès !')
        navigate('/mesinfos')
        console.log(result);
    }

    return (
        <>
            <h1 className="titleUserAccount">Modifier mes informations</h1>
                <form onSubmit={updateUserDetails}>
                    <div className='inputLogin'>
                    <input
                        className="inputBox"
                        name="lastName_u"
                        type='text'
                        value={authParsed.user.lastName_u}
                        onChange={(e)=>setLastName(e.target.value)}
                        placeholder="NOM"
                    />
                    <input
                        className="inputBox"
                        name="firstName_u"
                        type='text'
                        value={authParsed.user.firstName_u}
                        onChange={(e)=>setFirstName(e.target.value)}
                        placeholder="PRÉNOM"
                    />
                    </div>
                    <div className='inputLogin'>
                    <input
                        className="inputBox"
                        name="company_u"
                        type='text'
                        value={authParsed.user.company_u}
                        onChange={(e)=>setCompany(e.target.value)}
                        placeholder="NOM ENTREPRISE"
                    />
                    <input
                        className="inputBox"
                        name="siret_u"
                        type='text'
                        value={authParsed.user.siret_u}
                        onChange={(e)=>setSiret(e.target.value)}
                        placeholder="SIRET"
                    />
                    </div>
                    <div className='inputLogin'>
                    <input
                    className="inputBox"
                        type='text'
                        value={authParsed.user.address_u}
                        name="address_u"
                        onChange={(e)=>setAdress(e.target.value)}
                        placeholder="ADRESSE ENTREPRISE"
                    />
                    </div>
                    <div className='inputLogin'>
                    <input
                        className="inputBox"
                        name="phone_u"
                        type='text'
                        value={authParsed.user.phone_u}
                        onChange={(e)=>setPhone(e.target.value)}
                        placeholder="TÉLÉPHONE"
                    />
                    <input
                        className="inputBox"
                        name="email"
                        type='text'
                        value={authParsed.user.email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="EMAIL"
                    />
                    <input
                        className="inputBox"
                        name="key_r"
                        type='hidden'
                        value={authParsed.user.key_r}
                        onChange={(e)=>setKey_r(e.target.value)}
                    />
                    </div>
                <div className="submitSection">
                    <a href='/mesinfos'><button type="button" className="submitBoxCancel">annuler</button></a>
                    <button onClick={updateUserDetails} type="submit" className="submitBox">sauvgarder</button>
                </div>
            </form>
            <Footer />
        </>
    )
}

export default UpdateUsersDetails
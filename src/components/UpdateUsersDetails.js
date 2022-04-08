import React, {useState} from 'react';
import { baseUrl } from '../utils/fetchApi'
import { useNavigate } from "react-router-dom"
import './SignUpSection.css'
import Footer from './Footer';

const UpdateUsersDetails = () => {
    const [formData, setFormData] = React.useState(
        {
            lastName_u: "",
            firstName_u: "",
            company_u: "",
            phone_u: "",
            address_u: "",
            siret_u: "",
            email: "",
            key_r: "0"
        }
    )

    console.log(formData);

    function handleChange(event){
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const navigate = useNavigate()

    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth);
    console.log(JSON.parse(auth))

    function updateUserDetails(){
        let result = fetch(`${baseUrl}/users/${authParsed.user._id}`, {
            method:'PATCH',
            body:JSON.stringify(formData),
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
            <h1 className="titleSignUp">Modifier mes informations</h1>
                <form onSubmit={updateUserDetails}>
                    <div className='inputLogin'>
                    <input
                        className="inputBox"
                        name="lastName_u"
                        type='text'
                        onChange={handleChange}
                        placeholder="NOM"
                    />
                    <input
                        className="inputBox"
                        name="firstName_u"
                        type='text'
                        value={formData.firstName_u}
                        onChange={handleChange}
                        placeholder="PRÉNOM"
                    />
                    </div>
                    <div className='inputLogin'>
                    <input
                        className="inputBox"
                        name="company_u"
                        type='text'
                        value={authParsed.user.company_u}
                        onChange={handleChange}
                        placeholder="NOM ENTREPRISE"
                    />
                    <input
                        className="inputBox"
                        name="siret_u"
                        type='text'
                        value={authParsed.user.siret_u}
                        onChange={handleChange}
                        placeholder="SIRET"
                    />
                    </div>
                    <div className='inputLogin'>
                    <input
                    className="inputBox"
                        type='text'
                        value={authParsed.user.address_u}
                        name="address_u"
                        onChange={handleChange}
                        placeholder="ADRESSE ENTREPRISE"
                    />
                    </div>
                    <div className='inputLogin'>
                    <input
                        className="inputBox"
                        name="phone_u"
                        type='text'
                        value={authParsed.user.phone_u}
                        onChange={handleChange}
                        placeholder="TÉLÉPHONE"
                    />
                    <input
                        className="inputBox"
                        name="email"
                        type='text'
                        value={authParsed.user.email}
                        onChange={handleChange}
                        placeholder="EMAIL"
                    />
                    <input
                        className="inputBox"
                        name="key_r"
                        type='hidden'
                        value={authParsed.user.key_r}
                        onChange={handleChange}
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
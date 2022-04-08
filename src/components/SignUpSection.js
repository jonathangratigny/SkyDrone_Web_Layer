import React, { useState } from "react"
import '../App.css'
import './SignUpSection.css'
import Footer from "./Footer"
import { baseUrl } from "../utils/fetchApi"
import { useNavigate } from "react-router-dom"

const SignUpSection = () => {
    // const regexMail = /^[a-z0-9.-]+[@]{1}[a-z0-9.-]+[.]{1}[a-z]{2,4}$/
    const [lastName_u, setLastName] = useState('')
    const [firstName_u, setFirstName] = useState('')
    const [company_u, setCompany] = useState('')
    const [phone_u, setPhone] = useState('')
    const [address_u, setAdress] = useState('')
    const [siret_u, setSiret] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [key_r, setKey_r] = useState('0')
    const navigate = useNavigate()
    
    const collectData = async () => {
        console.log(lastName_u, firstName_u, company_u, phone_u, address_u, siret_u, email, password, key_r)
        let result = await fetch(`${baseUrl}/signup`, {
            method:'post',
            body: JSON.stringify({lastName_u, firstName_u, company_u, phone_u, address_u, siret_u, email, password, key_r}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json()
        if(result){
            localStorage.setItem('user', JSON.stringify(result))
            alert('Votre compte a été crée avec succès !')
            navigate('/dashboard')
        } else {
            alert("NOPE")
            navigate('/')
        }
    }

    return (
        <>
        <div className="signup-container">
            <div className="test">
            <h1 className="titleSignUp">formulaire d'inscription</h1>
                <div className="inputLogin">
                    <input
                        className="inputBox"
                        name="lastName_u"
                        type='text'
                        value={lastName_u}
                        onChange={(e)=>setLastName(e.target.value)}
                        placeholder="NOM"
                    />
                    <input
                        className="inputBox"
                        name="firstName_u"
                        type='text'
                        value={firstName_u}
                        onChange={(e)=>setFirstName(e.target.value)}
                        placeholder="PRÉNOM"
                    />
                </div>
                <div className="inputLogin">
                    <input
                        className="inputBox"
                        name="company_u"
                        type='text'
                        value={company_u}
                        onChange={(e)=>setCompany(e.target.value)}
                        placeholder="NOM ENTREPRISE"
                    />
                    <input
                        className="inputBox"
                        name="siret_u"
                        type='text'
                        value={siret_u}
                        onChange={(e)=>setSiret(e.target.value)}
                        placeholder="SIRET"
                    />
                </div>
                <div className="inputLogin">
                    <input
                    className="inputBox"
                        type='text'
                        value={address_u}
                        name="address_u"
                        onChange={(e)=>setAdress(e.target.value)}
                        placeholder="ADRESSE ENTREPRISE"
                    />
                </div>
                <div className="inputLogin">
                    <input
                        className="inputBox"
                        name="phone_u"
                        type='text'
                        value={phone_u}
                        onChange={(e)=>setPhone(e.target.value)}
                        placeholder="TÉLÉPHONE"
                    />
                    <input
                        className="inputBox"
                        name="email"
                        type='text'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="EMAIL"
                    />
                </div>
                <div className="inputLogin">
                    <input
                        className="inputBox"
                        name="password"
                        type='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="MOT DE PASSE"
                    />
                    {/* <input
                        className="inputBox"
                        name="confirmPassword"
                        type='hidden'
                        placeholder="CONFIRMEZ MOT DE PASSE"
                    /> */}
                    <input
                        className="inputBox"
                        name="key_r"
                        type='hidden'
                        value={key_r}
                        onChange={(e)=>setKey_r(e.target.value)}
                        placeholder=""
                    />
                </div>
                <div className="submitSection">
                    <button
                        type="button"
                        onClick={collectData}
                        className="submitBox">inscription
                    </button>
                </div>
                </div>
        </div>
        <Footer />
        </>
    )
}

export default SignUpSection
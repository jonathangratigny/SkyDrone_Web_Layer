import React, { useEffect } from "react"
import '../App.css'
import './SignUpSection.css'
import Footer from "./Footer"
import { baseUrl } from "../utils/fetchApi"
import { useNavigate, useParams } from "react-router-dom"
import { useGlobalState } from '../App';

const SignInSection = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()
    const [state, dispatch] = useGlobalState()

    const handleLogin = async () => {
        console.warn(email, password)
        let result = await fetch(`${baseUrl}/login`,{
            method:'post',
            body:JSON.stringify({email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const checkConnexion = await result.json()
        // const inBase = fetch(`${baseUrl}/users/${id}`)
        if(checkConnexion){
            localStorage.setItem('user', JSON.stringify(checkConnexion))
            dispatch({auth: true})
            navigate('/')
        } else {
            navigate('/')
        }
    }
    
    return (
        <>
        <div className="signup-container">
            <div className="test">
            <h1 className="titleSignUp">Connectez-vous à votre compte</h1>
                <div className="inputLoginTest">
                    <input
                        className="inputBox"
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        type='text'
                        placeholder="EMAIL"
                    />
                    <input
                        className="inputBox"
                        name="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        type='password'
                        placeholder="MOT DE PASSE"
                    />
                </div>
                <div className="submitSection">
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="submitBox">
                        CONNEXION
                    </button>
                </div>
                </div>
        </div>
        </>
    )
}

export default SignInSection
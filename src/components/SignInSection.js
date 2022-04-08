import React, { useEffect } from "react"
import '../App.css'
import './SignUpSection.css'
import Footer from "./Footer"
import { baseUrl } from "../utils/fetchApi"
import { useNavigate, useParams } from "react-router-dom"

const SignInSection = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if(auth)
            {
                navigate('/dashboard')
            }
    }, [])
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
            navigate('/dashboard')
        } else {
            alert("Identifiants incorrects")
            console.log('echo');
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
        <Footer />
        </>
    )
}

export default SignInSection
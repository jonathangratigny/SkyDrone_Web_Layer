import React, { useState } from "react"
import '../App.css'
import './SignUpSection.css'
import { baseUrl } from "../utils/fetchApi"
import { useNavigate, useParams } from "react-router-dom"
import { useGlobalState } from '../App'

const SignInSection = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [state, dispatch] = useGlobalState()
    const [message, setMessage] = useState({
        data: 'Email ou mot de passe incorrect',
        type: 'warning'
    })
    const [validForm, setValidForm] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        console.warn(email, password)
        try {
            const login = await fetch(`${baseUrl}/login`, {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const result = await login.json()
            const hasError = result.status != null && result.status !== 'Connexion réussie'

            if (hasError) {
                localStorage.removeItem('user')
                dispatch({ auth: false })
                setValidForm(true)
                setMessage({
                    data: 'Email ou mot de passe incorrect',
                    type: 'warning'
                })
            }
            else {
                localStorage.setItem('user', JSON.stringify(result))
                dispatch({ auth: true })
                setMessage({
                    data: result.message,
                    type: 'success'
                })
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }

    }

    
    //message de validation du formulaire
    // console.log(validForm)
    // console.log(message)
    const messageValidation = () => {
        if (validForm) {
            return (
                <div className='message-validation'>
                    <p>{message.data}</p>
                </div>
            )
        }
    }

    return (
        <>
            <div className="signup-container">
                <div className="test">
                    <h1 className="titleSignUp">S'identifier</h1>
                    <div className="inputLoginTest">
                        {messageValidation()}
                        <input
                            className="inputBox form-control"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            placeholder="EMAIL"
                            required
                        />
                        <input
                            className="inputBox"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            placeholder="MOT DE PASSE"
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center pt-5">
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
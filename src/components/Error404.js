import React, {useState, useEffect} from 'react'
import '../App.css'
import './HeroSection.css'
import { baseUrl } from '../utils/fetchApi'
import Footer from './Footer'

const ErrorSection = () => {
    const [error, setError] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/`);
            const json = await data.json()
            setError(json)
        }
        fetchData()

    }, [])

    return (
        <>
        <h1 className='titleDrone'>{error.message}</h1>
        <div className='gif'>
            <img src="images/drone404.jpg" alt="404error" width="500" height="264"></img>
        </div>
        <Footer />
        </>
    )
}

export default ErrorSection
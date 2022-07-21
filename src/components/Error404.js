import React, {useState, useEffect} from 'react'
import '../App.css'
import './HeroSection.css'

const ErrorSection = () => {
    const [error, setError] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}/`);
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
        </>
    )
}

export default ErrorSection
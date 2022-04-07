import React, {useState, useEffect} from 'react'
import DroneCard from './DroneCard'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { baseUrl } from '../utils/fetchApi'
import { useParallax  } from 'react-scroll-parallax';

const Drones = () => {
    const [drones, setDrones] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/drones`);
            const json = await data.json()

            const populate = json.map(async (drone) => {
                const data2 = await fetch(`${baseUrl}/categories/${drone.category_id}`);
                const json2 = await data2.json()
                drone.category_info = json2
                drone.id = drone._id
                drone.price = drone.pricePerDay_d
                return drone
            })

            setDrones(await Promise.all(populate))
        }
        
        fetchData()
        
        

    }, [])

    const { ref } = useParallax({ speed: -10 });

    return (
        <>
        <div  className='hero'>
            <div className="hero_overlay" ref={ref}>
                <img  src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
            </div>
            <h1 className='titleDrone'>notre sélection de drones</h1>
          </div>

        <div className='container'>
            <ul className='cards__items'>
                
                {drones.map((drone, index) => (
                    <li className="cards__container" key={index}>

                        <Link to={drone._id}>
                            <DroneCard drone={drone} ></DroneCard>
                        </Link>

                    </li>
                ))}
                
            </ul>
        </div>
        
        <Footer />
        </>
    )
}

export default Drones
import React, {useState, useEffect} from 'react'
import DroneCard from './DroneCard'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { baseUrl } from '../utils/fetchApi'

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
                return drone
            })

            setDrones(await Promise.all(populate))
        }
        
        fetchData()
        
        

    }, [])

    

    return (
        <>
        <h1 className='titleDrone'>notre sélection de drones</h1>
        <div className='container'>
          	<ul className='cards__items'>
				
                {drones.map(drone => (
		            <li className="cards__container" key={drone._id}>

                        <Link to={drone._id}>
                            <DroneCard drone={drone}></DroneCard>
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
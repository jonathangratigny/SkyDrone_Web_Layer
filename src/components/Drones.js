import React, { useState, useEffect } from 'react'
import DroneCard from './DroneCard'
import { Link } from 'react-router-dom'

import { useParallax } from 'react-scroll-parallax'
import ContentLoader from 'react-content-loader'

const Drones = () => {
    const [drones, setDrones] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_BASE_URL}/drones`)
            const json = await data.json()

            const populate = json.map(async (drone) => {
                const data2 = await fetch(`${process.env.REACT_APP_BASE_URL}/categories/${drone.category_id}`)
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

    const { ref } = useParallax({ speed: -10 })

    return (
        <>
            <div className='hero'>
                <div className="hero_overlay" ref={ref}>
                    <img src='./images/hero_product.jpg' alt='drone' className='hero__img'></img>
                </div>
                <h1 className='titleDrone'>notre sélection de drones</h1>
            </div>

            <div className='container'>
                {drones.length === 0 ? (
                    <div className='d-flex justify-content-center mt-5'>
                        <ContentLoader
                            width={400}
                            height={650}
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            {...drones}
                        >
                            <circle cx="77" cy="63" r="52" />
                            <circle cx="118" cy="98" r="25" />
                            <rect x="30" y="134" rx="0" ry="0" width="113" height="14" />
                            <rect x="46" y="154" rx="0" ry="0" width="82" height="13" />
                            <rect x="28" y="177" rx="0" ry="0" width="123" height="78" />

                        </ContentLoader>
                        <ContentLoader
                            width={400}
                            height={650}
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            {...drones}
                        >
                            <circle cx="77" cy="63" r="52" />
                            <circle cx="118" cy="98" r="25" />
                            <rect x="30" y="134" rx="0" ry="0" width="113" height="14" />
                            <rect x="46" y="154" rx="0" ry="0" width="82" height="13" />
                            <rect x="28" y="177" rx="0" ry="0" width="123" height="78" />

                        </ContentLoader>
                        <ContentLoader
                            width={400}
                            height={650}
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            {...drones}
                        >
                            <circle cx="77" cy="63" r="52" />
                            <circle cx="118" cy="98" r="25" />
                            <rect x="30" y="134" rx="0" ry="0" width="113" height="14" />
                            <rect x="46" y="154" rx="0" ry="0" width="82" height="13" />
                            <rect x="28" y="177" rx="0" ry="0" width="123" height="78" />

                        </ContentLoader>
                    </div>
                ) :
                    <ul className='cards__items'>

                        {drones.map((drone, index) => (
                            <li className="cards__container" key={index}>

                                <Link to={drone._id}>
                                    <DroneCard drone={drone} />
                                </Link>

                            </li>
                        ))}
                    </ul>
                }
            </div>
        </>
    )
}

export default Drones
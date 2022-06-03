import React from 'react'
import './ServicesSection.css'

function ServicesSection() {
    return(
        <>
        <div  className='hero'>
            <div className="hero_overlay">
                <img  src='../images/test2.jpg' alt='drone' className='hero__img'></img>
            </div>
            <h1 className='titleDrone'>Aperçu des réalisations</h1>
        </div>

        <div className=''>
            <h2>Quelques aperçus des réalisations de nos clients grâce à la location des drones que nous vous proposons.</h2>
            <div className='about'>
    	        <h1>hello</h1>
    		
        		<div className="imgAbout2">
					<p>TEXTE ICI</p>
            	</div>
            	<div className="imgAbout2">
                <p>TEXTE ICI</p>
          		</div>
            
        </div>
        </div>
        </>
    )
}

export default ServicesSection
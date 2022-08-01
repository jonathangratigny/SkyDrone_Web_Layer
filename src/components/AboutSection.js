import React from 'react'
import './AboutSection.css'

function AboutSection() {
	return (
		<>
			<div className='about'>
				<h1>Notre Vision</h1>
				<div className="sectionPresentation">
					<div className="imgAbout">
						<img src="images/img-10.jpg" className="imgBio" alt=""></img>
					</div>
					<div className="contentAbout">
						<p className="textAbout">Si vous recherchez une location de matériel audiovisuel, SKY'DRONE vous accompagne dans la location de votre matériel vidéo et photo dans toute la France en vous conseillant en fonction de vos besoins et de vos projets audio/vidéo.
						</p>
						<p className="textAbout">Vous souhaitez louer un drone? Il vous suffit de sélectionner le produit qui vous intéresse et nous indiquer la durée de votre location. Notre magasin est capable de vous livrer le drone. Notre équipe répond à tous vos besoins en matière de photographie aérienne, de la simple photo vue du ciel au projet vidéo complet.</p>
						<p className='textAbout'>Sky'Drone s'efforce de vous répondre le plus rapidement possible en mettant en oeuvre toutes les compétences de ses équipes.</p>
						<p className='textAbout'>TEST COMMIT THEO</p>
					</div>
				</div>
			</div>

			<div className='about'>
				<h1>Nos Références</h1>
				<div className="sectionReferences">
					<div className="imgAbout2">
						<img src="images/AXA-logo.png" className="imgBio2" alt="AXA-logo"></img>
						<img src="images/Bouygues-logo.png" className="imgBio2" alt="Bouygues-logo"></img>
						<img src="images/eiffage-logo.png" className="imgBio2" alt="eiffage-logo"></img>
						<img src="images/ENEDIS-logo.png" className="imgBio2" alt="ENEDIS-logo"></img>
					</div>
					<div className="imgAbout2">
						<img src="images/ORANGE-logo.png" className="imgBio2" alt="ORANGE-logo"></img>
						<img src="images/SG-logo.jpg" className="imgBio2" alt="SG-logo"></img>
						<img src="images/VINCI-logo.png" className="imgBio2" alt="VINCI-logo"></img>
						<img src="images/WB-logo.png" className="imgBio2" alt="WB-logo"></img>
					</div>
				</div>
			</div>
		</>
	)
}

export default AboutSection
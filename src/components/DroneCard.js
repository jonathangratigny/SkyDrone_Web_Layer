import React from 'react';
import './Cards.css';

const DroneCard = ({ drone }) => {
	let category = drone.category_info ?? (drone.category_id ? drone.category_id : 'Inconnu')

	return (
			<div className="cards__item__link" key={drone._id}>
				<figure className="cards__item__pic-wrap" data-category={category.name_cat ?? 'Inconnu'}>
					<img src={`./images/${drone._id}.png`} alt='drone' className='cards__item__img'></img>
				</figure>
				<div className="cards__item__info">
					<h5 className="cards__item__text">{drone.name_d}</h5>
				<hr></hr>
					{/* <p className="cards__item__desc">{drone.description_d}</p> */}
					<footer className='d-flex align-items-center justify-content-between'>
						<span className="cards__item__price">{drone.pricePerDay_d}€/jours</span>
						
						<span className={drone.state === 'En Stock' ? "cards__item__dispo" : "cards__item__indispo"}>{drone.state}</span>
					</footer>
				</div>
					<button className="btnSignUp">Réserver</button>
			</div>
     
 	);
}

export default DroneCard;
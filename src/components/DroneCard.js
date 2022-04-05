import React from 'react';
import './Cards.css';
import { baseUrl } from '../utils/fetchApi'

const DroneCard = ({ drone }) => {
	let category = drone.category_info ?? (drone.category_id ? drone.category_id : 'Inconnu')

	return (
			<div className="cards__item__link">
				<figure className="cards__item__pic-wrap" data-category={category.name_cat}>
					<img src='./images/img-9.png' alt='drone' className='cards__item__img'></img>
				</figure>
				<div className="cards__item__info">
					<h5 className="cards__item__text">{drone.name_d}</h5>
					<h5 className="cards__item__desc">{drone.description_d}</h5>
					<h5 className="cards__item__price">{drone.pricePerDay_d}€/jours</h5>
				</div>
			</div>
     
 	);
}

export default DroneCard;
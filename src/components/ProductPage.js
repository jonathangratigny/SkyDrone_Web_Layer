import React from 'react';
import './ProductPage.css';
import { baseUrl } from '../utils/fetchApi'
import { useCart } from "react-use-cart";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { useState } from 'react';
import * as locales from 'react-date-range/dist/locale';
import { logDOM } from '@testing-library/react';

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const handleDragStart = (e) => e.preventDefault();

const items = [
	<img src="/images/img-2.png" onDragStart={handleDragStart} alt="presentation" />,
	<img src="/images/img-3.png" onDragStart={handleDragStart} alt="presentation" />,
	<img src="/images/img-9.png" onDragStart={handleDragStart} alt="presentation" />,
  ];


const DroneCard = ({ drone }) => {
	const [state, setState] = useState({
		change: null,
		selection: {
			startDate: null,
			endDate: null,
			key: 'selection',
			showPreview: false,
		},
		compare: {
			startDate: new Date(),
			endDate: addDays(new Date(), 3),
			key: 'compare',
			showDateDisplay: false,
			autoFocus: false,
			color: '#ff0000'
		}
	})
	console.log(state);

	const { addItem } = useCart();
	let category = drone.category_info ?? (drone.category_id ? drone.category_id : 'Inconnu')

	console.log(state.selection.startDate);

	return (
			<div className="cards_container m-auto d-flex my-5">
				<div className="productCarousel"  >
					<AliceCarousel 
					mouseTracking 
					autoPlay 
					infinite 
					autoPlayInterval={2000} 
					animationDuration={1000} 
					items={items} />
				</div>
				<div className="productDesc"  >
					<div className="cards__item__info">
						<h5 className="cards__item__text">{drone.name_d} {category.name_cat ?? 'Inconnu'}</h5>
						<hr></hr>
						<p className="cards__item__desc">{drone.description_d}</p>
						<footer className='d-flex align-items-center justify-content-between'>
							<span className="cards__item__price">{drone.pricePerDay_d}€/jours</span>
							<span className="cards__item__dispo">Disponible</span>
						</footer>
						<div className={`total mt-3 ${state.change ? '' : 'd-none'}` }>
							<p>Période du {state.selection.startDate ? state.selection.startDate.toLocaleDateString() : ''} au {state.selection.endDate ? state.selection.endDate.toLocaleDateString() : ''} </p>
							<p>Total : {drone.pricePerDay_d * ((Math.floor(Math.abs((state.selection.endDate - state.selection.startDate)/1000))/86400) + 1)} €</p>
						</div>
						<button className={`btnSignUp mt-3 ${state.change && 'disabled'}`}  disabled={!state.change} onClick={() => addItem(drone)}>Réserver</button>
					</div>
					<div className='datePicker'>
						<p>Selectionner la periode d'utilisation</p>
						<hr></hr>
						<DateRange
							onChange={item => setState({ ...state, ...item, change: true })}
							months={1}
							minDate={addDays(new Date(), 0)}
							maxDate={addDays(new Date(), 365)}
							direction="vertical"
							scroll={{ enabled: true }}
							ranges={[state.selection, state.compare]}
							locale={locales['fr']}
							/>
						</div>
				</div>
			</div>
     
 	);
}

export default DroneCard;
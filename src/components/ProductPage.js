import React from 'react';
import './ProductPage.css';
import { useCart } from "react-use-cart";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { useState, useEffect } from 'react';
import * as locales from 'react-date-range/dist/locale';

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
			startDate: new Date(),
			endDate: null,
			key: 'selection',
			showPreview: false,
			color: '#40be40',
		},
		compare: {
			startDate: new Date(),
			endDate: addDays(new Date(), 3),
			key: 'compare',
			showDateDisplay: false,
			autoFocus: false,
			color: '#FFE53B'
		},
	})
	useEffect(() => {
		drone.startDate =  state.selection.startDate
		drone.endDate = state.selection.endDate
		console.log(drone)
		
	}, [state.selection])

	drone.id = drone._id
	drone.price = drone.pricePerDay_d

	const { addItem } = useCart();
	let category = drone.category_info ?? (drone.category_id ? drone.category_id : 'Inconnu')

	let totalDay = (state.selection.endDate - state.selection.startDate) / (1000 * 60 * 60 * 24) + 1
	let startDate = state.selection.startDate ? state.selection.startDate.toLocaleDateString() : ''
	let endDate = state.selection.endDate ? state.selection.endDate.toLocaleDateString() : ''



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
						<h5 className="cards__item__text d-flex">{drone.name_d} <span className='ms-auto'>{category.name_cat ?? 'Inconnu'}</span></h5>
						<hr></hr>
						<p className="cards__item__desc">{drone.description_d}</p>
						<footer className='d-flex align-items-center'>
							<span className="cards__item__price">{drone.pricePerDay_d}€/jour</span>
							<span className="cards__item__dispo ms-auto">Disponible</span>
							<span className="cards__item__res ms-2">Réserver</span>
						</footer>
						{ state.change &&
						<div className="total mt-3">
							<p><span className='fw-bold'>Période :</span> {startDate} au {endDate} </p>
							<p><span className='fw-bold'>Total :</span> {totalDay} {totalDay > 1 ? 'jours' : 'jour'}</p>
							<p><span className='fw-bold'>Prix Total :</span> {drone.pricePerDay_d * totalDay} €</p>
						</div>
						}
						<button className="btnSignUp mt-3"  disabled={!state.change} onClick={() => addItem(drone)}>Réserver</button>
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
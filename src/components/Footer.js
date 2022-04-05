import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
    	<div className='footer-links'>
			<div className='footer-link-items'>
				<h3>Nous joindre</h3>
				<p>SKY DRONE</p>
				<p>10 Place Léon Meyer</p>
				<p>76600 Le Havre</p>
				<p>02 35 10 20 30</p>
			</div>
			<div className='footer-link-items'>
				<h3>Informations</h3>
				<p>Contact</p>
				<p>Notre équipe</p>
				<p>Mentions légales</p>
				<p>Réglementation</p>
			</div>
      	</div>
      	<section className='social-media'>
        	<div className='social-media-wrap'>
			<div className='social-icons'>
            	<Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'><i className='fab fa-facebook-f'/></Link>
            	<Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'><i className='fab fa-instagram' /></Link>
            	<Link className='social-icon-link youtube' to='/' target='_blank' aria-label='Youtube'><i className='fab fa-youtube' /></Link>
          	</div>
          		<small className='website-rights'>SKY DRONE © 2022</small>
        	</div>
      	</section>
    </div>
  );
}

export default Footer;
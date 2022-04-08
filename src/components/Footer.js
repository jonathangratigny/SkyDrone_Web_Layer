import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <div class="footer-dark">
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-md-3 item">
                        <h3>SERVICES</h3>
                        <ul>
                            <li><a href="#">Location</a></li>
                            <li><a href="#">Pilotage</a></li>
                            <li><a href="#">Relevés de données</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>A PROPOS</h3>
                        <ul>
                            <li><a href="#">Notre équipe</a></li>
                            <li><a href="#">Réalisations de nos clients</a></li>
                            <li><a href="#">Mentions légales</a></li>
                        </ul>
                    </div>
                    <div class="col-md-6 item text">
                        <h3>SKY DRONE</h3>
                        <p>Votre préstataire aérien pour tous vos projets.</p>
						<p>Découvrez sans plus tarder notre sélection de drones professionnels adaptée à toutes vos ambitions.</p>
                    </div>
                    <div class="col item social">
						<Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'><i className='fab fa-facebook-f'/></Link>
						<Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'><i className='fab fa-instagram'/></Link>
						<Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'><i className='fab fa-youtube'/></Link>
					</div>
                </div>
                <p class="copyright">SKY DRONE © 2022</p>
            </div>
        </footer>
    </div>
  );
}

export default Footer;
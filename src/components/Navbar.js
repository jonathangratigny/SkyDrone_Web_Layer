import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import './Button.css'
import { BsCalendarWeek } from "react-icons/bs";
import { useCart } from "react-use-cart";
import { useGlobalState } from '../App';




const Navbar = () => {
  const { isEmpty, totalItems } = useCart();
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)
  const [state, dispatch] = useGlobalState();

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
	  if (window.innerWidth <= 960) {
		  setButton(false)
	  } else {
		  setButton(true)
	  }
  }


  window.addEventListener('resize', showButton)


  return (
    <>
        <nav className='myNavbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    <span className="colorCompany">SKY</span>'DR<span className="colorCompany">O</span>NE
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                  <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Accueil
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                      Drones
                    </Link>
                  </li>
                  {/* <li className='nav-item'>
                    <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                      Aperçu
                    </Link>
                  </li> */}

          			{
						state.auth ? <li><Link className='nav-links' to='/dashboard'>Mon Compte</Link></li>
						:
						<>
            <li><Link className='hiddenbtn' to='/sign-up'><button className='btnSignUp'>Inscription</button></Link></li>
						<li><Link className='hiddenbtn' to='/sign-in'><button className='myBtn'>Connexion</button></Link></li>
						</>
					}


				          <li className='nav-item'>
                    <Link to='/cart' className='nav-links position-relative' onClick={closeMobileMenu}>
                      <BsCalendarWeek />
                      <span className={isEmpty ? 'd-none' : 'notEmpty'}>{totalItems}</span>
                    </Link>
                  </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

import logo from '../static/logo.png'

const Navbar = () => (
  <div className='navbar'>
    <div className='navbar-content'>
      <div className='navbar-logo'>
        <Link to='/'>
          <img src={logo} alt='Logo'/>
        </Link>
      </div>
      <div className='navbar-links'>
        <Link to='/players'>
          <button variant="raised" className='button-nav'>
              Players
          </button>
        </Link>
        <Link to='/decks'>
          <button variant="raised" className='button-nav'>
              Decks
          </button>
        </Link>
        {/*
        <Link to='/tournaments'>
          <button variant='raised'>
            Tournaments
          </button>
        </Link>
        */}
      </div>
    </div>
  </div>
)

export default Navbar

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <div className='navbar'>
    <Link to='/'>
      Name Forthcoming
    </Link>
    <Link to='/players'>
      <button variant="raised">
          Players
      </button>
    </Link>
    <Link to='/decks'>
      <button variant="raised">
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
)

export default Navbar

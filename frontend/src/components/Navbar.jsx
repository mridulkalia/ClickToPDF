import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-white p-4 shadow-lg'>
      <div className='container mx-auto flex items-center'>
        {/* Logo */}
        <div className='text-3xl font-extrabold ps-4 pe-12 pb-1'>
          <Link
            to='/'
            className='text-gray-800 hover:text-blue-500 text-2xl font-extrabold tracking-wide transform transition duration-300 ease-in-out hover:scale-105'
            style={{
              fontFamily: 'Quicksand, sans-serif',
              textShadow: '1px 1px 5px rgba(0, 0, 0, 0.281)'
            }}
          >
            ClickToPDF
          </Link>
        </div>

        {/* Navigation Links */}
        <div className='flex space-x-6'>
          <NavLink
            to='/wordtopdf'
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-500 font-bold text-lg transition-all duration-300 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            Word to PDF
          </NavLink>
          <NavLink
            to='/privacy'
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-500 font-bold text-lg transition-all duration-300 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-500 font-bold text-lg transition-all duration-300 ${
                isActive ? 'text-blue-600 font-semibold' : ''
              }`
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

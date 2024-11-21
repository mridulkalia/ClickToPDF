import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-gray-100 p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-xl font-bold'>
          <Link to='/' className='text-gray-800 hover:text-blue-500'>
            ClickToPDF
          </Link>
        </div>
        <div className='flex space-x-4'>
          <Link
            to='/wordtopdf'
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-500 ${
                isActive ? 'font-semibold text-blue-600' : ''
              }`
            }
          >
            Word to PDF
          </Link>
          <Link
            to='/privacy'
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-500 ${
                isActive ? 'font-semibold text-blue-600' : ''
              }`
            }
          >
            Privacy Policy
          </Link>
          <Link
            to='/about'
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-500 ${
                isActive ? 'font-semibold text-blue-600' : ''
              }`
            }
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

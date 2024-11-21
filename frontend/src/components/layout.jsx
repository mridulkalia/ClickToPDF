import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <title>
        <title>Convert from DOCX to PDF.</title>
      </title>
      <div>
        <Navbar />
      </div>
      <div className='mt-6 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>{children}</div>
      </div>
      <Footer />
    </>
  )
}

export default Layout

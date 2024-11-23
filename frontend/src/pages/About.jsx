import React from 'react'
import Layout from '../components/layout'

const About = () => {
  return (
    <Layout>
      <div className='max-w-xl mx-auto my-8 p-4 bg-white shadow-lg rounded-lg'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold text-gray-800'>About Us</h1>
          <p className='mt-4 text-lg text-gray-600'>This is the about page.</p>
        </div>
      </div>
    </Layout>
  )
}

export default About

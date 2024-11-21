import React from 'react'
import Layout from '../components/layout'
const Home = () => {
  return (
    <Layout>
      <div className='max-w-4xl mx-auto p-4'>
        <div className='bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4'>
          <h2 className='font-semibold text-lg'>Welcome to ClickToPDF</h2>
          <p className='mt-2'>
            ClickToPDF is a tool that allows you to convert documents to PDF.
          </p>
          <hr className='my-2 border-blue-500' />
        </div>
      </div>
    </Layout>
  )
}

export default Home

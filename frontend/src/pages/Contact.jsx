import React from 'react'
import Layout from '../components/layout'

const Contact = () => {
  return (
    <Layout>
      <div className='max-w-4xl mx-auto p-6'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-bold text-gray-800 text-center mb-6'>
            Contact Us
          </h1>
          <p className='text-center text-gray-600 mb-8'>
            Have questions or need assistance? Reach out to us using the form
            below or via email. We'd love to hear from you!
          </p>
          <form className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-gray-700 font-medium'>
                Your Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                className='w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                required
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-gray-700 font-medium'
              >
                Your Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                className='w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                required
              />
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-gray-700 font-medium'
              >
                Your Message
              </label>
              <textarea
                id='message'
                name='message'
                rows='5'
                placeholder='Type your message here...'
                className='w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                required
              />
            </div>

            <div className='text-center'>
              <button
                type='submit'
                className='px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className='mt-12 text-center text-gray-600 mb-8'>
          <p>
            Alternatively, you can email us directly at{' '}
            <a
              href='mailto:mridulkalia3@gmail.com'
              className='text-blue-500 hover:underline'
            >
              mridulkalia3@gmail.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact

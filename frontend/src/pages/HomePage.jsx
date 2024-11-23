import React from 'react'
import Layout from '../components/layout'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Layout>
      <div className='max-w-5xl mx-auto p-8'>
        <div className='text-center bg-blue-100 p-6 rounded-lg shadow-lg'>
          <h1 className='text-4xl font-bold text-blue-700'>
            Welcome to ClickToPDF
          </h1>
          <p className='text-lg text-blue-600 mt-3'>
            Your one-stop solution to seamlessly convert Word documents to PDF
            format.
          </p>
          <Link to={'/wordtopdf'}>
            <button className='mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200'>
              Get Started
            </button>
          </Link>
        </div>

        <div className='mt-10'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Feature 1 */}
            <div className='bg-white rounded-lg shadow-md p-6 text-center'>
              <div className='flex justify-center items-center h-16 w-16 mx-auto bg-blue-200 text-blue-700 rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4.75l4.75 4.75H14.25v6.5h-4.5v-6.5H7.25L12 4.75z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-blue-600 mt-4'>
                Easy to Use
              </h3>
              <p className='text-gray-700 mt-2'>
                Upload your Word document, and get a high-quality PDF in
                seconds!
              </p>
            </div>

            {/* Feature 2 */}
            <div className='bg-white rounded-lg shadow-md p-6 text-center'>
              <div className='flex justify-center items-center h-16 w-16 mx-auto bg-blue-200 text-blue-700 rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6.5h16M4 12h16M4 17.5h16'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-blue-600 mt-4'>
                High-Quality PDFs
              </h3>
              <p className='text-gray-700 mt-2'>
                Ensure your document formatting is preserved during the
                conversion.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='bg-white rounded-lg shadow-md p-6 text-center'>
              <div className='flex justify-center items-center h-16 w-16 mx-auto bg-blue-200 text-blue-700 rounded-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 8c2.485 0 4.5 1.567 4.5 3.5S14.485 15 12 15s-4.5-1.567-4.5-3.5S9.515 8 12 8zm0 1.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zM10.5 7a1.5 1.5 0 00-3 0c0 .828.672 1.5 1.5 1.5S10.5 7.828 10.5 7zM16.5 7a1.5 1.5 0 00-3 0c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-blue-600 mt-4'>
                Privacy Guaranteed
              </h3>
              <p className='text-gray-700 mt-2'>
                Your files are not stored or shared. Your privacy is our
                priority.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Start Converting Your Documents Now!
          </h2>
          <p className='text-gray-700 mt-2'>
            No sign-up required. Quick, easy, and free to use.
          </p>
          <Link to={'/wordtopdf'}>
            <button className='mt-4 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200'>
              Convert Now
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className='mt-16 bg-gray-100 p-6 rounded-lg shadow-inner text-center'>
          <p className='text-gray-600'>
            Have questions or feedback?{' '}
            <a href='/contact' className='text-blue-500 hover:underline'>
              Contact us
            </a>{' '}
            today!
          </p>
        </div>
      </div>

      {/* Google Fonts */}
      <link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Inter:wght@400;600&display=swap'
        rel='stylesheet'
      />
      <style jsx global>{`
        body {
          font-family: 'Roboto', sans-serif;
        }

        h1,
        h2,
        h3 {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </Layout>
  )
}

export default Home

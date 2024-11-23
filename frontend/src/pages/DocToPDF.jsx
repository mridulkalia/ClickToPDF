import React, { useState, useRef } from 'react'
import axios from 'axios'
import Layout from '../components/layout'

const formatFileSize = bytes => {
  if (bytes < 1024) return `${bytes} bytes`
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`
  else if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(2)} MB`
  else return `${(bytes / 1073741824).toFixed(2)} GB`
}

const formatTime = time => {
  const date = new Date(time)
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const DocxToPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [metadata, setMetadata] = useState({})
  const [apiResponse, setApiResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pdfLink, setPdfLink] = useState(null)

  const fileInputRef = useRef(null)

  const handleFileChange = async e => {
    const file = e.target.files[0]
    e.preventDefault()

    // Reset states on file change
    setSelectedFile(file)
    setMetadata({})
    setApiResponse(null)
    setPdfLink(null)
    setIsLoading(true)

    if (!file) {
      setApiResponse('No file selected. Please select a .docx file.')
      setIsLoading(false)
      return
    }

    try {
      const data = new FormData()
      data.append('file', file)

      // file upload aur convert krna
      const response = await axios.post('http://localhost:5000/convert', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'arraybuffer'
      })

      console.log('Response Headers:', response.headers)
      console.log('Content-Type:', response.headers['content-type'])

      if (response.headers['content-type'] !== 'application/pdf') {
        throw new Error('Response is not a PDF file!')
      }

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' })

      const pdfUrl = URL.createObjectURL(pdfBlob)
      setPdfLink(pdfUrl)
      const originalName = file.name
      const pdfFileName = originalName.replace(/\.docx$/i, '.pdf')

      console.log('PDF Blob:', pdfBlob)
      console.log('PDF URL:', pdfUrl)

      setMetadata({
        originalName: pdfFileName,
        size: file.size,
        uploadedAt: Date.now()
      })

      setApiResponse('The file has been converted and is ready for download.')
      setTimeout(() => setApiResponse(null), 10000)
    } catch (error) {
      console.error(
        'Error during file conversion:',
        error.response ? error.response.data : error.message
      )
      setApiResponse('Error during file conversion. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setMetadata({})
    setPdfLink(null)
    setApiResponse(null)
    setIsLoading(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Layout>
      <div className='max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg'>
        <div className='text-center mb-6'>
          <h2 className='text-4xl font-bold text-gray-900 mb-5'>
            Convert Word Documents to PDF
          </h2>
          <p className='text-lg text-gray-600'>
            Upload a DOCX file and instantly convert it to PDF format.
          </p>
        </div>

        {apiResponse && (
          <div className='mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md'>
            <h4 className='font-semibold'>Notice</h4>
            <p>{apiResponse}</p>
          </div>
        )}

        <div className='mb-6 flex justify-center'>
          <input
            type='file'
            id='file-upload'
            accept='.docx'
            ref={fileInputRef}
            className='hidden'
            onChange={handleFileChange}
          />
          <label
            htmlFor='file-upload'
            className='cursor-pointer bg-blue-500 text-white text-lg font-semibold py-6 px-12 rounded-lg text-center hover:bg-blue-600 transition duration-200 mt-8'
          >
            {selectedFile ? (
              <div className='flex items-center justify-between'>
                <span className='truncate max-w-xs'>{selectedFile.name}</span>
                <button
                  type='button'
                  onClick={handleClearFile}
                  className='ml-2 text-red-600 hover:text-red-800'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            ) : (
              'Select WORD files'
            )}
          </label>
        </div>

        {isLoading && (
          <div className='flex justify-center my-4'>
            <div className='loader'></div>
          </div>
        )}

        {pdfLink && (
          <div className='mt-6 bg-gray-100 p-4 rounded-lg shadow-md'>
            <h4 className='font-semibold text-gray-800'>File Metadata:</h4>
            <ul className='text-gray-700'>
              <li>
                <strong>Original Name:</strong> {metadata.originalName || 'N/A'}
              </li>
              <li>
                <strong>Size:</strong> {formatFileSize(metadata.size || 0)}
              </li>
              <li>
                <strong>Uploaded At:</strong> {formatTime(metadata.uploadedAt)}
              </li>
            </ul>
          </div>
        )}

        {pdfLink && (
          <div className='mt-6'>
            <a
              href={pdfLink}
              download={metadata.originalName}
              className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200'
            >
              Download PDF
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <link
        href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Inter:wght@400;600&display=swap'
        rel='stylesheet'
      />
      <style jsx global>{`
        body {
          font-family: 'Roboto', sans-serif;
        }

        h2,
        h4 {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </Layout>
  )
}

export default DocxToPDF

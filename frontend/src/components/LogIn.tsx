import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface LogInProps {
  handleLoginSuccess: (buckets: string[]) => void;
}

// LogIn component with bucket data callback
const LogIn: React.FC<LogInProps> = ({ handleLoginSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [apiToken, setApiToken] = useState('');
  const [authStatus, setAuthStatus] = useState<'success' | 'error' | null>(null); // Track authentication status
  const [errorMessage, setErrorMessage] = useState(''); // Track error message

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
    setAuthStatus(null); // Clear any previous status when opening modal
    setErrorMessage(''); // Clear any previous error message when opening modal
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send API Token to the backend
      const response = await fetch('http://localhost:7000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiToken }), // Send the API token in the request body
      });

      if (response.ok) {
        const data = await response.json(); // Parse response from the backend
        console.log('API Token successfully sent to the backend');

        // Pass bucket data to the parent component using handleLoginSuccess
        if (data.buckets) {
          handleLoginSuccess(data.buckets); // Pass bucket names back to the parent component
        }

        setAuthStatus('success'); // Set authentication status to success
        setShowModal(false); // Close modal after successful login
      } else {
        const errorData = await response.json(); // Extract error message from the response
        setAuthStatus('error'); // Set authentication status to error
        setErrorMessage(errorData.message || 'Authentication Failed'); // Set the error message
      }
    } catch (error) {
      console.error('Error occurred while sending API Token:', error);
      setAuthStatus('error');
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
        onClick={toggleModal}
      >
        Log In
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="relative p-6 bg-black text-white rounded-lg shadow-lg w-96">
            <button
              className="absolute top-2 right-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-200"
              style={{ width: '25px', height: '25px' }}
              onClick={toggleModal}
            >
              X
            </button>
            <h2 className="mb-4 text-lg font-bold">Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">API Token</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  type="text"
                  placeholder="Enter your API token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </div>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-lg w-full hover:bg-orange-600 transition duration-200"
                type="submit"
              >
                Log In
              </button>
            </form>

            {/* Display error alert if authentication fails */}
            {authStatus === 'error' && (
              <Stack sx={{ width: '100%', marginTop: '15px' }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;

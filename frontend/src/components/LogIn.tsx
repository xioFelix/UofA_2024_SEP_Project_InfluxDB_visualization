import React, { useState } from 'react';

// LogIn component
const LogIn: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [apiToken, setApiToken] = useState('');

  // Function to toggle modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

    // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Log the API Token to the console
    console.log('API Token entered:', apiToken);

    // You can also add additional logic here if needed, such as form validation
  };

  //   // Send API Token to the backend
  //   try {
  //     const response = await fetch('backendURL', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ apiToken }), // Send the API token in the request body
  //     });

  //     if (response.ok) {
  //       console.log('API Token successfully sent to the backend');
  //       // Optionally handle successful response (e.g., close the modal, show a success message)
  //       setShowModal(false);
  //     } else {
  //       console.error('Failed to send API Token to the backend');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred while sending API Token:', error);
  //   }
  // };

  return (
    <div className="relative">
      {/* Orange Button to open the Log In modal with hover effect */}
      <button
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
        onClick={toggleModal}
      >
        Log In
      </button>

      {/* Modal that appears when the user clicks the Log In button */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="relative p-6 bg-black text-white rounded-lg shadow-lg w-96">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-200"
              style={{ width: '25px', height: '25px' }} // Adjust this value to control the size
              onClick={toggleModal}
            >
              X
            </button>
            <h2 className="mb-4 text-lg font-bold">Log In</h2>
            {/* Form inside the modal for entering the API Token */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">API Token</label>
                {/* Input field for the API Token */}
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  type="text"
                  placeholder="Enter your API token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </div>
              {/* Log In button inside the modal */}
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-lg w-full hover:bg-orange-600 transition duration-200"
                type="submit"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;

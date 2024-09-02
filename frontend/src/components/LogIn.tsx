import React, { useState } from 'react';

// LogIn component
const LogIn: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [apiToken, setApiToken] = useState('');

  // Function to toggle modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Return TSX
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
          <div className="p-6 bg-black text-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-lg font-bold">Log In</h2>
            {/* Form inside the modal for entering the API Token */}
            <form>
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
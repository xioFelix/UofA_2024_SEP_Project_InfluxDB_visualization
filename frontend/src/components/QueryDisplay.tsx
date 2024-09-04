import React, { useState } from "react";

const QueryDisplay: React.FC= () => {
    const [isQueryVisible, setIsQueryVisible] = useState<boolean>(false);
    const toggleQueryVisibility = () => {
        setIsQueryVisible(!isQueryVisible);
    };

    return (

        <div className="fixed inset-x-0 bottom-0 p-4 border-t shadow-lg bg-white transition-all duration-300 ease-in-out">
            <button 
                onClick={toggleQueryVisibility} 
                className="mt-2 text-left w-full flex justify-between items-center font-semibold text-lg"
                aria-expanded={isQueryVisible}
            >
                Query Display
                <span>{isQueryVisible ? '▲' : '▼'}</span>
            </button>
            {isQueryVisible && (
                <div className="mt-2 p-3 bg-gray-100 rounded">
                    <p>Content area can be used for interactions.</p>
                </div>
            )}
        </div>
    );    
}

export default QueryDisplay;
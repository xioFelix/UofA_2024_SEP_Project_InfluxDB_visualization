import React, { useState } from 'react';
import LogIn from './LogIn';
import DragAndDrop from './DragAndDrop';

const ParentComponent: React.FC = () => {
  // State to store the bucket names received after a successful login
  const [buckets, setBuckets] = useState<string[]>([]);

  // Function that gets called on successful login, storing the bucket names in state
  const handleLoginSuccess = (bucketNames: string[]) => {
    setBuckets(bucketNames); // Update the buckets state with the received bucket names
  };

  return (
    <div>
      {/* Render the LogIn component, passing handleLoginSuccess as a prop */}
      <LogIn handleLoginSuccess={handleLoginSuccess} />

      {/* Render the DragAndDrop component, passing the bucket names as a prop */}
      <DragAndDrop buckets={buckets} />
    </div>
  );
};

export default ParentComponent;

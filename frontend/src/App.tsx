// Desc: Main App component
import { useState } from 'react';
import Header from './components/Header';
import DragAndDrop from './components/DragAndDrop';
import QueryDisplay from './components/QueryDisplay';

function App() {
  const [buckets, setBuckets] = useState<string[]>([]); // State to manage bucket names

  // Function to handle login success and receive bucket names
  const handleLoginSuccess = (bucketNames: string[]) => {
    setBuckets(bucketNames); // Store bucket names in state
  };

  return (
    <div>
      {/* Render the Header component, with LogIn button inside */}
      <Header handleLoginSuccess={handleLoginSuccess} />
      
      {/* Render DragAndDrop component and pass the buckets as a prop */}
      <div className="mt-16">
        <DragAndDrop buckets={buckets} />
      </div>
      
      {/* Render QueryDisplay component */}
      <div>
        <QueryDisplay />
      </div>
    </div>
  );
}

export default App;

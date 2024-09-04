// Desc: Main App component
import Header from './components/Header';
import DragAndDrop from './components/DragAndDrop';
import QueryDisplay from './components/QueryDisplay';

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-16">
        <DragAndDrop />
      </div>
      <div>
      <QueryDisplay />
      </div>
    </div>
  );
}

export default App

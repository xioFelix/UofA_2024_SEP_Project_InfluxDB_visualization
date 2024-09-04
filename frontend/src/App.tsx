// Desc: Main App component
import Header from './components/Header';
import DragAndDrop from './components/DragAndDrop';

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-16">
        <DragAndDrop />
      </div>
    </div>
  );
}

export default App

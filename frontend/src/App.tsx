// Desc: Main App component
import Header from './components/Header';
import DragAndDrop from './components/DragAndDrop';
import QueryPresenter from './components/QueryPresenter';

function App() {
  return (
    <div>
      <div>
        <Header />
        <QueryPresenter />
      </div>
      <div className="mt-16">
        <DragAndDrop />
      </div>
    </div>
  );
}

export default App

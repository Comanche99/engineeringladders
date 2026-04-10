import { useState } from 'react';
import { useFrameworkStorage } from './hooks/useFrameworkStorage';
import { getExampleByName } from './utils/templates';
import FrameworkEditor from './components/FrameworkEditor';
import './App.css';

function App() {
  const { framework, isSaved, updateFramework, clearFramework, setFramework } = useFrameworkStorage();
  const [showLoadModal, setShowLoadModal] = useState(false);

  const handleLoadExample = (exampleName: string) => {
    const example = getExampleByName(exampleName);
    if (example) {
      setFramework(example);
      setShowLoadModal(false);
    }
  };

  const handleNewFramework = () => {
    if (!isSaved && !window.confirm('You have unsaved changes. Create a new framework anyway?')) {
      return;
    }
    clearFramework();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Career Framework Builder</h1>
        <div className="header-actions">
          <button onClick={handleNewFramework} className="btn btn-secondary">
            New Framework
          </button>
          <button onClick={() => setShowLoadModal(true)} className="btn btn-secondary">
            Load Example
          </button>
          <span className={`save-status ${isSaved ? 'saved' : 'unsaved'}`}>
            {isSaved ? '✓ Saved' : '● Unsaved'}
          </span>
        </div>
      </header>

      <main className="app-main">
        <FrameworkEditor framework={framework} onUpdate={updateFramework} />
      </main>

      {showLoadModal && (
        <div className="modal-overlay" onClick={() => setShowLoadModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Load Example Framework</h2>
            <button onClick={() => handleLoadExample('developer')} className="btn btn-primary">
              Developer Framework
            </button>
            <button onClick={() => setShowLoadModal(false)} className="btn btn-tertiary">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

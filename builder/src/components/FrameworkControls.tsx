import React, { useRef } from 'react';
import { Framework } from '../types/index';
import { downloadJSON, downloadMarkdown, importFrameworkFromJSON } from '../utils/export';
import './FrameworkControls.css';

interface FrameworkControlsProps {
  framework: Framework;
  // onFrameworkLoaded?: (framework: Framework) => void;
}

const FrameworkControls: React.FC<FrameworkControlsProps> = ({ framework }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFrameworkValid = (): boolean => {
    return (
      framework.name.trim() !== '' &&
      framework.roleLevels.length > 0 &&
      framework.dimensions.length > 0
    );
  };

  const handleExportJSON = () => {
    if (!isFrameworkValid()) {
      alert('Framework must have a name, at least one role level, and at least one dimension.');
      return;
    }
    downloadJSON(framework);
  };

  const handleExportMarkdown = () => {
    if (!isFrameworkValid()) {
      alert('Framework must have a name, at least one role level, and at least one dimension.');
      return;
    }
    downloadMarkdown(framework);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        importFrameworkFromJSON(content);
        // Note: The actual loading is handled by the parent App component
        // through localStorage. Here we just validate.
        alert('Framework imported successfully! Please reload the page or use the "Load Example" button to load it.');
      } catch (error) {
        alert(`Error importing framework: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
  };

  return (
    <div className="framework-controls">
      <h3>Export & Import</h3>
      
      <div className="controls-group">
        <button
          onClick={handleExportJSON}
          className="btn btn-primary"
          title="Download framework as JSON"
        >
          📥 Export JSON
        </button>
        <button
          onClick={handleExportMarkdown}
          className="btn btn-primary"
          title="Download framework as Markdown"
        >
          📥 Export Markdown
        </button>
      </div>

      <div className="controls-group">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-secondary"
          title="Import framework from JSON"
        >
          📤 Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          style={{ display: 'none' }}
        />
      </div>

      <div className="validation-info">
        <h3>Validation</h3>
        <ul>
          <li className={framework.name.trim() ? 'valid' : 'invalid'}>
            ✓ Framework name
          </li>
          <li className={framework.roleLevels.length > 0 ? 'valid' : 'invalid'}>
            ✓ Role levels ({framework.roleLevels.length})
          </li>
          <li className={framework.dimensions.length > 0 ? 'valid' : 'invalid'}>
            ✓ Dimensions ({framework.dimensions.length})
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FrameworkControls;

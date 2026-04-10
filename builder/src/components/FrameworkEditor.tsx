import React, { useState } from 'react';
import { Framework } from '../types/index';
import RoleListPanel from './RoleListPanel';
import DimensionPanel from './DimensionPanel';
import ExpectationEditor from './ExpectationEditor';
import RadarVisualization from './RadarVisualization';
import FrameworkControls from './FrameworkControls';
import './FrameworkEditor.css';

interface FrameworkEditorProps {
  framework: Framework;
  onUpdate: (updates: Partial<Framework>) => void;
}

const FrameworkEditor: React.FC<FrameworkEditorProps> = ({ framework, onUpdate }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedDimensionId, setSelectedDimensionId] = useState<string | null>(null);

  const handleFrameworkNameChange = (name: string) => {
    onUpdate({ name });
  };

  const handleFrameworkDescriptionChange = (description: string) => {
    onUpdate({ description });
  };

  const handleRolesChange = (roleLevels: Framework['roleLevels']) => {
    onUpdate({ roleLevels });
  };

  const handleDimensionsChange = (dimensions: Framework['dimensions']) => {
    onUpdate({ dimensions });
  };

  const handleExpectationsChange = (expectations: Framework['expectations']) => {
    onUpdate({ expectations });
  };

  return (
    <div className="framework-editor">
      <div className="editor-panel left-panel">
        <div className="metadata-section">
          <h2>Framework Details</h2>
          <div className="form-group">
            <label>Framework Name</label>
            <input
              type="text"
              value={framework.name}
              onChange={e => handleFrameworkNameChange(e.target.value)}
              placeholder="e.g., Developer Career Ladder"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={framework.description || ''}
              onChange={e => handleFrameworkDescriptionChange(e.target.value)}
              placeholder="Brief description of this framework"
            />
          </div>
        </div>

        <RoleListPanel
          roleLevels={framework.roleLevels}
          selectedRoleId={selectedRoleId}
          onRolesChange={handleRolesChange}
          onSelectRole={setSelectedRoleId}
        />

        <DimensionPanel
          dimensions={framework.dimensions}
          selectedDimensionId={selectedDimensionId}
          onDimensionsChange={handleDimensionsChange}
          onSelectDimension={setSelectedDimensionId}
        />
      </div>

      <div className="editor-panel center-panel">
        <ExpectationEditor
          framework={framework}
          selectedRoleId={selectedRoleId}
          selectedDimensionId={selectedDimensionId}
          onExpectationsChange={handleExpectationsChange}
        />
      </div>

      <div className="editor-panel right-panel">
        <RadarVisualization framework={framework} />
        <FrameworkControls framework={framework} />
      </div>
    </div>
  );
};

export default FrameworkEditor;

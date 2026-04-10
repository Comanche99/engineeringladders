import React, { useState } from 'react';
import { Dimension } from '../types/index';
import { generateId, defaultScalePoints } from '../utils/framework';
import './DimensionPanel.css';

interface DimensionPanelProps {
  dimensions: Dimension[];
  selectedDimensionId: string | null;
  onDimensionsChange: (dimensions: Dimension[]) => void;
  onSelectDimension: (dimensionId: string | null) => void;
}

const DimensionPanel: React.FC<DimensionPanelProps> = ({
  dimensions,
  selectedDimensionId,
  onDimensionsChange,
  onSelectDimension
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAddDimension = () => {
    const newDimension: Dimension = {
      id: generateId(),
      name: `Dimension ${dimensions.length + 1}`,
      scalePoints: defaultScalePoints.map(sp => ({ ...sp, id: generateId() })),
      order: dimensions.length
    };
    onDimensionsChange([...dimensions, newDimension]);
    onSelectDimension(newDimension.id);
  };

  const handleRemoveDimension = (id: string) => {
    onDimensionsChange(dimensions.filter(d => d.id !== id));
    if (selectedDimensionId === id) {
      onSelectDimension(null);
    }
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = (id: string) => {
    onDimensionsChange(
      dimensions.map(d => d.id === id ? { ...d, name: editingName } : d)
    );
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const handleUpdateScalePoint = (dimensionId: string, pointIndex: number, newLabel: string) => {
    onDimensionsChange(
      dimensions.map(d => {
        if (d.id === dimensionId) {
          const newScalePoints = [...d.scalePoints];
          newScalePoints[pointIndex] = { ...newScalePoints[pointIndex], label: newLabel };
          return { ...d, scalePoints: newScalePoints };
        }
        return d;
      })
    );
  };

  return (
    <div className="section">
      <div className="section-title">
        <span>Dimensions</span>
        <button onClick={handleAddDimension} className="btn btn-small btn-primary">
          + Add
        </button>
      </div>
      {dimensions.length === 0 ? (
        <div className="empty-state">No dimensions yet. Add one to get started.</div>
      ) : (
        <div>
          {dimensions.map(dimension => (
            <div key={dimension.id}>
              <div
                className={`list-item ${selectedDimensionId === dimension.id ? 'selected' : ''}`}
                onClick={() => onSelectDimension(dimension.id)}
              >
                <div className="list-item-text">
                  {editingId === dimension.id ? (
                    <input
                      autoFocus
                      type="text"
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                      onBlur={() => handleSaveEdit(dimension.id)}
                      onKeyDown={e => handleKeyDown(e, dimension.id)}
                      onClick={e => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      onDoubleClick={e => {
                        e.stopPropagation();
                        handleStartEdit(dimension.id, dimension.name);
                      }}
                    >
                      {dimension.name}
                    </span>
                  )}
                </div>
                <div className="list-item-actions">
                  <button
                    className="expand-btn"
                    onClick={e => {
                      e.stopPropagation();
                      setExpandedId(expandedId === dimension.id ? null : dimension.id);
                    }}
                  >
                    {expandedId === dimension.id ? '▼' : '▶'}
                  </button>
                  <button
                    className="remove-btn"
                    onClick={e => {
                      e.stopPropagation();
                      handleRemoveDimension(dimension.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {expandedId === dimension.id && (
                <div className="scale-points-editor">
                  <label>Scale Points</label>
                  {dimension.scalePoints.map((point, idx) => (
                    <input
                      key={point.id}
                      type="text"
                      value={point.label}
                      onChange={e => handleUpdateScalePoint(dimension.id, idx, e.target.value)}
                      placeholder={`Level ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DimensionPanel;

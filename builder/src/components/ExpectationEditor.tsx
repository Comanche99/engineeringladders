import React from 'react';
import { Framework, Expectation } from '../types/index';
import './ExpectationEditor.css';

interface ExpectationEditorProps {
  framework: Framework;
  selectedRoleId: string | null;
  selectedDimensionId: string | null;
  onExpectationsChange: (expectations: Expectation[]) => void;
}

const ExpectationEditor: React.FC<ExpectationEditorProps> = ({
  framework,
  selectedRoleId,
  selectedDimensionId,
  onExpectationsChange
}) => {
  const handleScalePointChange = (roleLevelId: string, dimensionId: string, scalePointIndex: number) => {
    const updated = framework.expectations.filter(
      e => !(e.roleLevelId === roleLevelId && e.dimensionId === dimensionId)
    );
    updated.push({
      roleLevelId,
      dimensionId,
      scalePointIndex,
      description: ''
    });
    onExpectationsChange(updated);
  };

  const getExpectationForCell = (roleLevelId: string, dimensionId: string): Expectation | undefined => {
    return framework.expectations.find(
      e => e.roleLevelId === roleLevelId && e.dimensionId === dimensionId
    );
  };

  const getDimension = (dimensionId: string) => {
    return framework.dimensions.find(d => d.id === dimensionId);
  };

  const getRoleLevel = (roleLevelId: string) => {
    return framework.roleLevels.find(r => r.id === roleLevelId);
  };

  return (
    <div className="expectation-editor">
      <h2>Expectations Matrix</h2>
      
      {framework.roleLevels.length === 0 || framework.dimensions.length === 0 ? (
        <div className="empty-state">
          <p>Start by adding role levels and dimensions in the left panel.</p>
        </div>
      ) : (
        <div className="expectations-grid-wrapper">
          <table className="expectations-table">
            <thead>
              <tr>
                <th>Dimension</th>
                {framework.roleLevels.map(role => (
                  <th key={role.id} className={selectedRoleId === role.id ? 'selected' : ''}>
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {framework.dimensions.map(dimension => (
                <tr key={dimension.id} className={selectedDimensionId === dimension.id ? 'selected' : ''}>
                  <td className="dimension-cell">{dimension.name}</td>
                  {framework.roleLevels.map(role => {
                    const expectation = getExpectationForCell(role.id, dimension.id);
                    const scalePointIndex = expectation?.scalePointIndex ?? 0;
                    
                    return (
                      <td
                        key={`${role.id}-${dimension.id}`}
                        className={`expectation-cell ${selectedRoleId === role.id && selectedDimensionId === dimension.id ? 'selected' : ''}`}
                      >
                        <select
                          value={scalePointIndex}
                          onChange={e => handleScalePointChange(role.id, dimension.id, parseInt(e.target.value, 10))}
                        >
                          {dimension.scalePoints.map((point, idx) => (
                            <option key={point.id} value={idx}>
                              {point.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRoleId && selectedDimensionId && (
        <div className="selected-expectation-detail">
          <h3>
            {getRoleLevel(selectedRoleId)?.name} × {getDimension(selectedDimensionId)?.name}
          </h3>
          <p>
            Current level: <strong>{getDimension(selectedDimensionId)?.scalePoints[getExpectationForCell(selectedRoleId, selectedDimensionId)?.scalePointIndex ?? 0]?.label}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpectationEditor;

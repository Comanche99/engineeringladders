import React, { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Framework } from '../types/index';
import './RadarVisualization.css';

interface RadarVisualizationProps {
  framework: Framework;
}

const COLORS = [
  '#4a90e2',
  '#f5a623',
  '#47b881',
  '#bd3c26',
  '#ab47bc',
  '#00bcd4',
  '#ff9800',
  '#9ccc65'
];

const RadarVisualization: React.FC<RadarVisualizationProps> = ({ framework }) => {
  const data = useMemo(() => {
    if (framework.dimensions.length === 0 || framework.roleLevels.length === 0) {
      return [];
    }

    // Create data points for each dimension
    return framework.dimensions.map(dimension => {
      const dataPoint: Record<string, number | string> = {
        name: dimension.name
      };

      // Add a value for each role level
      framework.roleLevels.forEach(role => {
        const expectation = framework.expectations.find(
          e => e.roleLevelId === role.id && e.dimensionId === dimension.id
        );
        // Map scale point index (0-4) to values (1-5)
        dataPoint[role.id] = (expectation?.scalePointIndex ?? 0) + 1;
      });

      return dataPoint;
    });
  }, [framework.dimensions, framework.roleLevels, framework.expectations]);

  if (framework.dimensions.length === 0 || framework.roleLevels.length === 0) {
    return (
      <div className="radar-visualization">
        <h2>Visualization</h2>
        <div className="empty-state">
          <p>Add dimensions and role levels to see the radar chart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="radar-visualization">
      <h2>Visualization</h2>
      <div className="radar-chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <PolarGrid stroke="#ddd" />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 5]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            {framework.roleLevels.map((role, idx) => (
              <Radar
                key={role.id}
                name={role.name}
                dataKey={role.id}
                stroke={COLORS[idx % COLORS.length]}
                fill={COLORS[idx % COLORS.length]}
                fillOpacity={0.15}
                isAnimationActive={true}
              />
            ))}
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '11px'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="radar-legend">
        <h3>Scale</h3>
        <ul>
          <li><strong>1</strong> - Adopts</li>
          <li><strong>2</strong> - Applies</li>
          <li><strong>3</strong> - Specializes</li>
          <li><strong>4</strong> - Evangelizes</li>
          <li><strong>5</strong> - Masters</li>
        </ul>
      </div>
    </div>
  );
};

export default RadarVisualization;

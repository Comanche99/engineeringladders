import { Framework } from '../types/index';
import { generateId } from './framework';

const createExampleDeveloperFramework = (): Framework => {
  const dimensions = [
    'Technology',
    'System',
    'People',
    'Process',
    'Influence'
  ];

  const roleLevels = [
    'L1 - Junior Engineer',
    'L2 - Engineer',
    'L3 - Senior Engineer',
    'L4 - Staff Engineer',
    'L5 - Principal'
  ];

  const scaleLabels = ['Adopts', 'Applies', 'Specializes', 'Evangelizes', 'Masters'];

  const dimensionObjects = dimensions.map((name, idx) => ({
    id: generateId(),
    name,
    description: '',
    order: idx,
    scalePoints: scaleLabels.map((label, order) => ({
      id: generateId(),
      label,
      order
    }))
  }));

  const roleLevelObjects = roleLevels.map((name, idx) => ({
    id: generateId(),
    name,
    description: '',
    order: idx
  }));

  // Create expectations: each role level starts at a default scale point per dimension
  const expectations = roleLevelObjects.flatMap((role, roleIdx) =>
    dimensionObjects.flatMap(dim => ({
      roleLevelId: role.id,
      dimensionId: dim.id,
      scalePointIndex: Math.min(roleIdx, 4), // Start with role index as scale point
      description: ''
    }))
  );

  return {
    id: generateId(),
    name: 'Developer Framework',
    description: 'Engineering career progression framework for individual contributors',
    roleLevels: roleLevelObjects,
    dimensions: dimensionObjects,
    expectations,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
};

export const examples = {
  developer: createExampleDeveloperFramework()
};

export const getExampleByName = (name: string): Framework | null => {
  return (examples as Record<string, Framework>)[name.toLowerCase()] || null;
};

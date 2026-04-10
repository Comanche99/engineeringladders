import { Framework, RoleLevel, Dimension, ScalePoint } from '../types/index';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createEmptyFramework = (): Framework => ({
  id: generateId(),
  name: '',
  description: '',
  roleLevels: [],
  dimensions: [],
  expectations: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export const defaultScalePoints: ScalePoint[] = [
  { id: generateId(), label: 'Adopts', order: 0 },
  { id: generateId(), label: 'Applies', order: 1 },
  { id: generateId(), label: 'Specializes', order: 2 },
  { id: generateId(), label: 'Evangelizes', order: 3 },
  { id: generateId(), label: 'Masters', order: 4 },
];

export const createRoleLevel = (name: string): RoleLevel => ({
  id: generateId(),
  name,
  order: 0,
});

export const createDimension = (name: string): Dimension => ({
  id: generateId(),
  name,
  scalePoints: defaultScalePoints.map(sp => ({ ...sp, id: generateId() })),
  order: 0,
});

export interface ScalePoint {
  id: string;
  label: string;
  order: number;
}

export interface Dimension {
  id: string;
  name: string;
  description?: string;
  scalePoints: ScalePoint[];
  order: number;
}

export interface RoleLevel {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface Expectation {
  roleLevelId: string;
  dimensionId: string;
  scalePointIndex: number;
  description?: string;
}

export interface Framework {
  id: string;
  name: string;
  description?: string;
  roleLevels: RoleLevel[];
  dimensions: Dimension[];
  expectations: Expectation[];
  createdAt: number;
  updatedAt: number;
}

export type FrameworkState = {
  framework: Framework;
  selectedRoleId: string | null;
  selectedDimensionId: string | null;
  isSaved: boolean;
};

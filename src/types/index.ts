export type DeploymentUnit = {
  id: string;
  sasId: string;
  appModuleId: string;
  name: string;
  language: string;
  repositoryUrl: string;
};

export type DeploymentUnitVersion = {
  id: string;
  version: string;
  gitBranch: string;
  gitCommitHash: string;
  deploymentUnitId: string;
  appModuleId: string;
  sasId: string;
};

export type QualityGate = {
  id: string;
  versionId: string;
  type: string;
  result: string;
  percent: number;
  rating: string;
  createdAt: string;
  updatedAt: string;
};

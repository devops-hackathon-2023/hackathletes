export type Deployment = {
  id: string;
  versionId: string;
  deploymentUnitId: string;
  appModuleId: string;
  sasId: string;
  environment: string;
  status: string;
  changeTicketId: string;
  deployer: string;
  platform: string;
  startedAt: string;
  finishedAt: string;
  duration: number;
};

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
  createdAt: string;
  updatedAt: string;
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

export type ApiMultipleResults<T> = {
  pageNumber: number;
  pageCount: number;
  nextPage: number;
  pageSize: number;
  itemsTotalCount: number;
  page: T[];
};

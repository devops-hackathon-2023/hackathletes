import axios, { AxiosError } from 'axios';
import { useQueries, useQuery, UseQueryResult } from 'react-query';
import { Deployment, DeploymentUnit, DeploymentUnitVersion } from '@/types';

const apiConfig = {
  headers: {
    Authorization: 'Basic ZG9wbzpEZXZPcHMyMDIz',
  },
};

const API_URL = 'https://dopo.fly.dev/api/v1/dopo';
const MOCK_API_URL = 'http://localhost:3000/api';

export const useFetchAllSasses = (): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>('allSas', async () => {
    const response = await axios.get(`${API_URL}/sases?page=0&size=30&sort=name&order=asc`, apiConfig);

    return response.data;
  });

export const useFetchSasModules = (sasId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['sasModules', sasId], async () => {
    const response = await axios.get(`${API_URL}/sases/${sasId}/app-modules`, apiConfig);

    return response.data;
  });

export const useFetchUser = (userId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['user', userId], async () => {
    const response = await axios.get(`${MOCK_API_URL}/users/${userId}`);

    return response.data;
  });

export const useFetchAppModuleImage = (sas: string, moduleName: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['appModuleImage', sas, moduleName], async () => {
    const response = await axios.get(`${MOCK_API_URL}/app-module-images`, {
      params: { sas, module: moduleName },
    });

    return response.data;
  });

export const useFetchAppModuleDeploymentUnits = (moduleId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['appModuleDeploymentUnits', moduleId], async () => {
    const response = await axios.get(`${API_URL}/app-modules/${moduleId}/deployment-units`, apiConfig);
    return response.data;
  });

export const useFetchDeploymentUnitVersions = (deploymentUnitId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deploymentUnitVersions', deploymentUnitId], async () => {
    const response = await fetchDeploymentUnitVersions(deploymentUnitId);
    return response.data;
  });
export const useFetchLatestDeploymentUnitVersion = (deploymentUnitId: string) => {
  const { data } = useFetchDeploymentUnitVersions(deploymentUnitId);
  const deploymentUnitVersions = data?.page;
  return deploymentUnitVersions ? deploymentUnitVersions[deploymentUnitVersions.length - 1] : null;
};

const fetchDeploymentUnitVersions = async (deploymentUnitId: string) =>
  axios.get(`${API_URL}/deployment-units/${deploymentUnitId}/deployment-unit-versions`, apiConfig);

export const fetchLatestDeploymentUnitVersion = async (deploymentUnitId: string) => {
  const response = await fetchDeploymentUnitVersions(deploymentUnitId);
  const deploymentUnitVersions = response.data?.page;
  return deploymentUnitVersions[deploymentUnitVersions.length - 1];
};

export const useFetchAppModuleLatestDeploymentUnits = (moduleId: string) => {
  // --------- 1. Fetch deployment units for the module
  const {
    data: deploymentUnitsData,
    isLoading: isUnitsLoading,
    isError: isUnitsError,
  } = useFetchAppModuleDeploymentUnits(moduleId);

  const deploymentUnits: DeploymentUnit[] = deploymentUnitsData?.page || [];

  // --------- 2. Fetch latest deployment unit version for each deployment unit
  const latestDeploymentUnitVersionQueries = (deploymentUnitsData?.page || []).map(
    (deploymentUnit: DeploymentUnit) => ({
      queryKey: ['latestDeploymentUnitVersion', deploymentUnit.id],
      queryFn: () => fetchLatestDeploymentUnitVersion(deploymentUnit.id),
    })
  );
  const deploymentUnitVersionQueries = useQueries(latestDeploymentUnitVersionQueries);

  const deploymentUnitVersions: DeploymentUnitVersion[] = deploymentUnitVersionQueries
    .map((query) => query.data)
    .filter((version): version is DeploymentUnitVersion => !!version);

  // --------- 3. Combine deployment unit and deployment unit version data
  const enhancedDeploymentUnits = deploymentUnitVersions.map((version: DeploymentUnitVersion) => {
    const matchingUnit = deploymentUnits.find((unit: DeploymentUnit) => unit.id === version.deploymentUnitId);
    return {
      ...version,
      name: matchingUnit?.name,
      language: matchingUnit?.language,
      repositoryUrl: matchingUnit?.repositoryUrl,
    };
  });

  // --------- 4. Check if any of the queries are loading or errored
  const isLoading = isUnitsLoading || deploymentUnitVersionQueries.some((query) => query.isLoading);
  const isError = isUnitsError || deploymentUnitVersionQueries.some((query) => query.isError);

  // --------- 5. Return combined data
  return { enhancedDeploymentUnits, isLoading, isError };
};

export const useFetchDeployment = (deploymentId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deployment', deploymentId], async () => {
    const response = await axios.get(`${API_URL}/deployments/${deploymentId}`, apiConfig);
    return response.data;
  });

export const useFetchAllDeployments = (): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>('allDeployments', async () => {
    const response = await axios.get(`${API_URL}/deployments`, apiConfig);
    return response.data;
  });

export const useFetchLatestDeployments = (versionId: string): UseQueryResult<Deployment[], AxiosError> =>
  useQuery<any, AxiosError>(['latestDeployments', versionId], async () => {
    const response = await axios.get(
      `${API_URL}/deployments?size=100&versionId=${versionId}&sort=startedAt&order=desc`,
      apiConfig
    );
    const deployments = response.data.page;
    const latestDeploymentsByEnvironment: { [key: string]: any } = {};
    deployments.forEach((deployment: any) => {
      const env = deployment.environment;
      if (
        !latestDeploymentsByEnvironment[env] ||
        new Date(deployment.startedAt) > new Date(latestDeploymentsByEnvironment[env].startedAt)
      ) {
        latestDeploymentsByEnvironment[env] = deployment;
      }
    });

    return Object.values(latestDeploymentsByEnvironment);
  });

export const useFetchQualityGate = (deploymentVersionId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['qualityGate', deploymentVersionId], async () => {
    const response = await axios.get(`${API_URL}/quality-gates/${deploymentVersionId}`, apiConfig);
    return response.data;
  });

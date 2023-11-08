import axios, { AxiosError } from 'axios';
import { useQueries, useQuery, UseQueryResult } from 'react-query';
import { Deployment, DeploymentUnit, DeploymentUnitVersion, QualityGate } from '@/types';
import { useRouter } from 'next/router';

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

export const useGetCurrentSasId = (): string => {
  const { sas: sasName } = useRouter().query;
  const { data } = useFetchAllSasses();
  return data?.page?.find((sas: any) => sas.name === sasName)?.id;
};

export const useGetCurrentModules = (): any => useFetchSasModules(useGetCurrentSasId());
export const useGetCurrentModuleId = (): string => {
  const { module: moduleName } = useRouter().query;
  const { data } = useGetCurrentModules();
  return data?.page?.find((module: any) => module.name === moduleName)?.id;
};

export const useFetchUser = (userId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['user', userId], async () => {
    const response = await axios.get(`${MOCK_API_URL}/users/${userId}`);

    return response.data;
  });

export const updateUser = async (userId: string, updatedUser: object) => {
    const response = await axios.patch(`${MOCK_API_URL}/users/${userId}`, {userId, updatedUser});
    console.log(userId, updatedUser)
    // TODO: update logged user
    // TODO: invalidate
    return response.data;
}

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

export const useFetchDeploymentUnitVersion = (deploymentUnitVersionId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deploymentUnitVersion', deploymentUnitVersionId], async () => {
    const response = await axios.get(`${API_URL}/deployment-unit-versions/${deploymentUnitVersionId}`, apiConfig);
    return response.data;
  });

export const useFetchDeploymentsByDeploymentUnitId = (deploymentUnitId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deployments', deploymentUnitId], async () => {
    const response = await axios.get(
      `${API_URL}/deployments?page=0&size=30&sort=createdAt&order=desc&deploymentUnitId=${deploymentUnitId}`,
      apiConfig
    );
    {
      return response.data;
    }
  });

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
  return { data: enhancedDeploymentUnits, isLoading, isError };
};

export const useFetchDeploymentsByAppModuleId = (appModuleId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deployments', appModuleId], async () => {
    const response = await axios.get(
      `${API_URL}/deployments?size=100&appModuleId=${appModuleId}&sort=startedAt&order=desc`,
      apiConfig
    );
    return response.data;
  });

export const useFetchDeploymentsByVersionId = (versionId: string): UseQueryResult<Deployment[], AxiosError> =>
  useQuery<any, AxiosError>(['deployments', versionId], async () => {
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

export const useFetchLatestServersDeployments = (deploymentUnitId: string): UseQueryResult<Deployment[], AxiosError> =>
  useQuery<Deployment[], AxiosError>(['latestServersDeployments', deploymentUnitId], async () => {
    const response = await axios.get(
      `${API_URL}/deployments?size=100&deploymentUnitId=${deploymentUnitId}&sort=startedAt&order=desc`,
      apiConfig
    );
    const deployments = response.data.page;
    const latestDeploymentsByEnvironment: { [key: string]: Deployment } = {};
    deployments.forEach((deployment: Deployment) => {
      const env = deployment.environment;
      if (
        !latestDeploymentsByEnvironment[env] ||
        new Date(deployment.startedAt) > new Date(latestDeploymentsByEnvironment[env].startedAt)
      ) {
        latestDeploymentsByEnvironment[env] = deployment;
      }
    });

    return Object.values(latestDeploymentsByEnvironment).sort((a, b) => a.environment.localeCompare(b.environment));
  });

export const useFetchQualityGate = (deploymentVersionId: string): UseQueryResult<QualityGate[], AxiosError> =>
  useQuery<any, AxiosError>(['qualityGate', deploymentVersionId], async () => {
    const response = await axios.get(`${API_URL}/quality-gates/${deploymentVersionId}`, apiConfig);
    return response.data;
  });

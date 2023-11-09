import axios, { AxiosError } from 'axios';
import { QueryClient, useQueries, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { ApiMultipleResults, Deployment, DeploymentUnit, DeploymentUnitVersion, QualityGate } from '@/types';
import { useRouter } from 'next/router';
import { QUALITY_GATE_TYPES } from '@/constants';

export const apiConfig = {
  headers: {
    Authorization: 'Basic ZG9wbzpEZXZPcHMyMDIz',
  },
};

export const API_URL = 'https://dopo.fly.dev/api/v1/dopo';
export const MOCK_API_URL = 'http://localhost:3000/api';

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

export const updateUser = async (userId: string, updatedUser: object, queryClient: QueryClient) => {
  const response = await axios.patch(`${MOCK_API_URL}/users/${userId}`, { userId, updatedUser });
  await queryClient.invalidateQueries(['user', userId]);
  return response.data;
};

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

export const useFetchDeploymentUnit = (deploymentUnitId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deploymentUnitId', deploymentUnitId], async () => {
    const response = await axios.get(`${API_URL}/deployment-units/${deploymentUnitId}`, apiConfig);
    return response.data;
  });

type DeploymentUnitsQueryParams = {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  id?: string;
  name?: string;
};
export const useFetchDeploymentUnits = (params: DeploymentUnitsQueryParams): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deploymentUnitId', JSON.stringify(params)], async () => {
    const response = await axios.get(`${API_URL}/deployment-units`, {
      ...apiConfig,

      params: {
        page: params.page || 0,
        size: params.size || 30,
        sort: params.sort || 'name',
        order: params.order || 'asc',
        ...params,
      },
    });
    return response.data;
  });

export const useFetchDeploymentUnitVersion = (deploymentUnitVersionId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deploymentUnitVersion', deploymentUnitVersionId], async () => {
    const response = await axios.get(`${API_URL}/deployment-unit-versions/${deploymentUnitVersionId}`, apiConfig);
    return response.data;
  });

export const useFetchDeploymentUnitVersionsByDeploymentUnitId = (
  deploymentUnitId: string
): UseQueryResult<ApiMultipleResults<DeploymentUnitVersion>, AxiosError> =>
  useQuery<any, AxiosError>(['deploymentUnitVersions', deploymentUnitId], async () => {
    const response = await fetchDeploymentUnitVersions(deploymentUnitId);
    return response.data;
  });

const fetchDeploymentUnitVersions = async (deploymentUnitId: string) =>
  axios.get(`${API_URL}/deployment-units/${deploymentUnitId}/deployment-unit-versions?order=desc&size=100`, apiConfig);

export const useFetchLatestDeploymentUnitVersionByDeploymentUnitId = (
  deploymentUnitId: string
): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['latestDeploymentUnitVersion', deploymentUnitId], async () => {
    const response = await fetchDeploymentUnitVersions(deploymentUnitId);
    const deploymentUnitVersions = response.data?.page;
    console.log('deploymentUnitVersions: ', JSON.stringify(deploymentUnitVersions));
    console.log('returning this one: ', JSON.stringify(deploymentUnitVersions[0]));
    return deploymentUnitVersions[0];
  });

export const useFetchGithubBugsByDeploymentUnitId = (deploymentUnitId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(
    ['githubBugs', deploymentUnitId],
    async () => {
      const response = await axios.get(`${MOCK_API_URL}/github/bugs/${deploymentUnitId}`);
      return response.data;
    },
    {
      // Keep previous data while fetching the new one on background
      keepPreviousData: true,
    }
  );

export const useFetchQualityGatesByDeploymentUnitVersionId = (
  deploymentUnitVersionId: string
): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['qualityGates', deploymentUnitVersionId], async () => {
    const response = await axios.get(
      `${API_URL}/quality-gates?versionId=${deploymentUnitVersionId}&sort=percent&order=desc`,
      apiConfig
    );
    return response.data;
  });

type FetchQualityGatesParams = {
  page?: string;
  size?: string;
  sort?: string;
  order?: string;
  type?: (typeof QUALITY_GATE_TYPES)[number];
  result?: 'PASSED' | 'FAILED';
  versionId?: string;
  deploymentUnitId?: string;
  appModuleId?: string;
  sasId?: string;
  ratign?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
};
export const useFetchQualityGates = (
  params: FetchQualityGatesParams
): UseQueryResult<ApiMultipleResults<QualityGate>, AxiosError> =>
  useQuery<any, AxiosError>(['deployments', params], async () => {
    const defaultParams: FetchDeploymentsParams = {
      page: '0',
      size: '30',
      sort: 'id',
      order: 'asc',
      ...params,
    };
    const query = `?${new URLSearchParams(defaultParams).toString()}`;
    const response = await axios.get(`${API_URL}/quality-gates${query}`, apiConfig);

    return response.data;
  });

export const useFetchQualityGatesByAppModuleId = (appModuleId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['qualityGates', appModuleId], async () => {
    const response = await axios.get(`${API_URL}/quality-gates?appModuleId=${appModuleId}&size=100`, apiConfig);
    return response.data;
  });

export const useFetchDeploymentsByDeploymentUnitId = (deploymentUnitId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deployments', deploymentUnitId], async () => {
    const response = await axios.get(
      `${API_URL}/deployments?size=100&deploymentUnitId=${deploymentUnitId}&sort=startedAt&order=desc`,
      apiConfig
    );
    return response.data;
  });

export const useFetchLatestDeploymentForGivenEnvironmentByDeploymentUnitId = (
  deploymentUnitId: string,
  environment: string
): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['latestDeployment', deploymentUnitId, environment], async () => {
    const response = await axios.get(
      `${API_URL}/deployments?size=1&deploymentUnitId=${deploymentUnitId}&environment=${environment}&sort=startedAt&order=desc`,
      apiConfig
    );
    return response.data;
  });

export const useFetchLatestSuccessfulDeploymentForEachEnvironmentByDeploymentUnit = (
  deploymentUnitId: string
): UseQueryResult<Deployment[], AxiosError> =>
  useQuery(['latestSuccessfulDeployments', deploymentUnitId], async () => {
    const response = await axios.get(
      `${API_URL}/deployments?size=100&deploymentUnitId=${deploymentUnitId}&sort=startedAt&order=desc&status=SUCCESS`,
      apiConfig
    );
    const deployments = response.data.page;
    const latestDeploymentsByEnvironemnt: Deployment[] = [];
    deployments.forEach((deployment: Deployment) => {
      if (!latestDeploymentsByEnvironemnt.find((d) => d.environment === deployment.environment)) {
        latestDeploymentsByEnvironemnt.push(deployment);
      }
    });
    return latestDeploymentsByEnvironemnt.sort((a, b) => a.environment.localeCompare(b.environment));
  });

export const fetchLatestDeploymentUnitVersion = async (deploymentUnitId: string) => {
  const response = await fetchDeploymentUnitVersions(deploymentUnitId);
  const deploymentUnitVersions = response.data?.page;
  return deploymentUnitVersions[deploymentUnitVersions.length - 1];
};

export const useFetchAppModule = (moduleId: string): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['moduleId', moduleId], async () => {
    const response = await axios.get(`${API_URL}/app-modules/${moduleId}`, apiConfig);
    return response.data;
  });

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

type FetchDeploymentsParams = {
  page?: string;
  size?: string;
  sort?: string;
  order?: string;
  environment?: 'DEV' | 'INT' | 'PRS' | 'PRED' | 'PROD';
  status?: 'SUCCESS' | 'FAILED' | 'STARTED';
  changeTicketId?: string;
  deployer?: string;
  platform?: 'OPEN_SHIFT' | 'AZURE' | 'WEB_LOGIC';
  versionId?: string;
  deploymentUnitId?: string;
  appModuleId?: string;
  sasId?: string;
};
export const useFetchDeployments = (params: FetchDeploymentsParams): UseQueryResult<any, AxiosError> =>
  useQuery<any, AxiosError>(['deployments', params], async () => {
    const defaultParams: FetchDeploymentsParams = {
      page: '0',
      size: '30',
      sort: 'startedAt',
      order: 'desc',
      ...params,
    };
    const query = `?${new URLSearchParams(defaultParams).toString()}`;
    const response = await axios.get(`${API_URL}/deployments${query}`, apiConfig);

    return response.data;
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

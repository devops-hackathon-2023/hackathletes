import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

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

import axios, { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';

const apiConfig = {
  headers: {
    Authorization: 'Basic ZG9wbzpEZXZPcHMyMDIz',
  },
};

const API_URL = 'https://dopo.fly.dev/api/v1/dopo';
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

import axios from 'axios';
import { configuration } from '@/constants';
import { urlApi } from '@/constants/types';
import { useQuery } from 'react-query';

export function useFetchFromUrl(urlApi: urlApi): any {
  const { queryId, url } = urlApi;
  return useQuery(queryId, () => {
    return axios.get(url, configuration);
  });
}

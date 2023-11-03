import { urlApi } from './types';

export const apiAllSas: urlApi = {
  queryId: 'allSas',
  url: 'https://dopo.fly.dev/api/v1/dopo/sases?page=0&size=30&sort=name&order=asc',
};

export const configuration = {
  headers: {
    Authorization: 'Basic ZG9wbzpEZXZPcHMyMDIz',
  },
};

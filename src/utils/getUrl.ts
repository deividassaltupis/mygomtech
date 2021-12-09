import qs from 'query-string';
import { API } from '~/types/enums';

const getUrl = (endpoint: API, params?: Record<string, any>) => {
  const query = qs.stringify(params);

  return `${process.env.API_URL}/${endpoint}${query ? `?${query}` : ''}`;
};

export default getUrl;

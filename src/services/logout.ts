import { API } from '~/types/enums';
import getUrl from '../utils/getUrl';

const logout = async () => {
  const url = getUrl(API.Logout);

  // 1. Remove token from valid tokens array stored in server
  await fetch(url, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // 2. Remove token saved in localStorage
  localStorage.removeItem('token');
};

export default logout;

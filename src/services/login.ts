import { API } from '~/constants';
import getUrl from '../utils/getUrl';

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  
  // - If server did not respond with 200 - invalid login credentials
  if (response.status !== 200) throw new Error('Invalid login credentials');

  const data = await response.json();
  const { token } = data;

  localStorage.setItem('token', token);
};

export default login;

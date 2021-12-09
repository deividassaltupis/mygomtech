import { API } from '~/types/enums';
import getUrl from '~/utils/getUrl';

import { IItem } from '~/types/interfaces';

const getUserItems = async (userId?: string): Promise<Array<IItem>> => {
  const url = getUrl(API.Items, {
    userId,
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await response.json();

  return data.items;
};

export default getUserItems;

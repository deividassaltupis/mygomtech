import { useEffect, useState } from 'react';
import getUserItems from '~/services/getUserItems';
import { IItem } from '~/types/interfaces';

const useItemsProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [items, setItems] = useState<Array<IItem>>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const userItems = await getUserItems();

        setItems(userItems);
      } catch (error) {
        setErrorMessage(error.message);
      }

      setIsLoading(false);
    })();
  }, []);

  return {
    isLoading,
    errorMessage,
    items,
  };
};

export default useItemsProvider;
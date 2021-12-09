import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// - Common components
import { List, ErrorBlock, Filter, Header } from '~/components/common';

// - Context
import { useUserContext } from '~/components/custom/UserContext';

// - Pages
import { LoadingPage } from '..';

// - Hooks
import useItemsProvider from '~/hooks/useItemsProvider';

// - Interfaces
import { IItem } from '~/types/interfaces';

// - Enums
import { Routes, ItemFilter } from '~/types/enums';

// - Utils
import { filterItems } from '~/utils/filter';
import { countItems } from '~/utils/counter';

const UsersManagementPage = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { items: initialItems, isLoading, errorMessage } = useItemsProvider();

  // - Displayed items state
  const [items, setItems] = useState<Array<IItem>>([]);

  // - Single displayed item update function
  const itemUpdateHandler = (updatedItem: IItem) => {
    const copiedItemsArray = [...items];
    copiedItemsArray.forEach((listItem, index, array) => {
      if (listItem.id === updatedItem.id) array[index] = updatedItem;
    });
    setItems(copiedItemsArray);
  };

  // - Track loaded items changes and update currently displayed items
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  if (isLoading || userDataIsLoading) {
    return <LoadingPage />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className="container">
      <Header
        wrongItemsCount={countItems(items, ItemFilter.WRONG)}
        username={username}
      />
      <Filter items={items} />
      <Switch>
        <Route exact path={Routes.Users}>
          <List
            items={filterItems(items, ItemFilter.ALL)}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
        <Route path={Routes.WrongEmails}>
          <List
            items={filterItems(items, ItemFilter.WRONG)}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
        <Route path={Routes.ReusedEmails}>
          <List
            items={filterItems(items, ItemFilter.REUSED)}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
        <Route path={Routes.OldEmails}>
          <List
            items={filterItems(items, ItemFilter.OLD)}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default UsersManagementPage;

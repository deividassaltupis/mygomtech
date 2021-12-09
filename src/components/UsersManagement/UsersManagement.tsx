import { useState, useEffect } from 'react';

import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '~/constants';

import userHasWrongEmail from '~/utils/userHasWrongEmail';
import userHasReusedEmail from '~/utils/userHasReusedEmail';
import userHasOldEmail from '~/utils/userHasOldEmail';

import { useUserContext } from '../UserContext';

import { IItem } from '~/services/getUserItems';

const UsersManagement = () => {
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
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className="container">
      <Header
        wrongItems={items.filter((item) => userHasWrongEmail(item))}
        username={username}
      />
      <Filter items={items} />
      <Switch>
        <Route exact path={Routes.Users}>
          <List
            items={items}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
        <Route path={Routes.WrongEmails}>
          <List
            items={items.filter((item) => userHasWrongEmail(item))}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
        <Route path={Routes.ReusedEmails}>
          <List
            items={items.filter((item) => userHasReusedEmail(item, items))}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
        <Route path={Routes.OldEmails}>
          <List
            items={items.filter((item) => userHasOldEmail(item))}
            updateListItemFunc={(item: IItem) => itemUpdateHandler(item)}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default UsersManagement;

import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import { LoginPage, UsersManagementPage } from './components/pages';

import {
  UserContextProvider,
  PrivateRoute,
  PublicRoute,
} from './components/custom';

import { Routes } from './types/enums';

import './style/styles.scss';

const App = () => (
  <Router>
    <Switch>
      <PublicRoute path={Routes.Login} component={LoginPage} />
      <PrivateRoute
        path={Routes.Users}
        component={() => (
          <UserContextProvider>
            <UsersManagementPage />
          </UserContextProvider>
        )}
      />
      <PrivateRoute
        path={Routes.Root}
        component={() => <Redirect to={Routes.Users} />}
      />
    </Switch>
  </Router>
);

export default App;

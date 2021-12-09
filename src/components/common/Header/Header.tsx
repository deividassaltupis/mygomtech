import { FC } from 'react';
import { useHistory } from 'react-router-dom';

// - Enums
import { Routes } from '~/types/enums';

// - Context
import { useUserContext } from '~/components/custom/UserContext';

// - Services
import { logout } from '~/services';

import './header-style.scss';

interface IHeader {
  wrongItemsCount: number;
  username: string;
}

const Header: FC<IHeader> = ({ wrongItemsCount, username }) => {
  const { deleteData } = useUserContext();
  const { push } = useHistory();

  const handleLogout = async () => {
    await logout();

    // - Clear user data stored in states.
    deleteData();

    // - Redirect to login page
    push(Routes.Login);
  };

  return (
    <div className="header">
      <div className="user-section">
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${wrongItemsCount} Emails are wrong`}</h1>
      <span>
        Email validator to protect your company from bad registrations
      </span>
    </div>
  );
};

export default Header;

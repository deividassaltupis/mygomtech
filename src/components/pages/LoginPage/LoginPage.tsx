import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

// - Services
import { login } from '~/services';

// - Common components
import { ErrorBlock } from '~/components/common';

// - Pages
import { LoadingPage } from '..';

// - Enums
import { Routes } from '~/types/enums';

import './login-page-style.scss';

const LoginPage = () => {
  const { push } = useHistory();

  // - States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // - Regex function which tess if provided string contains only letters
  const isOnlyLetters = (string: string) => /^[a-zA-Z]+$/.test(string);

  // - Login submit handler
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      // - If no username of password is provided - throw error
      if (!username || !password)
        throw new Error('Please provide email and password');

      // - Check if username contains only letters
      if (!isOnlyLetters(username))
        throw new Error('Username must contain only letters');

      setIsLoading(true);

      // - Connect to server and try to login user
      await login(username, password);

      push(Routes.Users);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Mygom.tech</h1>
        <ErrorBlock error={errorMessage} />
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          type="text"
          className="input mt-52px"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="input mt-24px"
        />
        <button type="submit" className="button mt-24px">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

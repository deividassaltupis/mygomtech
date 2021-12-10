import { FC, memo } from 'react';

import './error-block-style.scss';

interface IErrorBlock {
  error: String;
}

const ErrorBlock: FC<IErrorBlock> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <div className="error-block px-16px py-12px">{error}</div>;
};

export default memo(ErrorBlock);

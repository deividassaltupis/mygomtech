import { FC } from 'react';
import { Routes } from '~/constants';
import { IItem } from '~/services/getUserItems';
import FilterTab from './components/FilterTab';

import userHasWrongEmail from '~/utils/userHasWrongEmail';
import userHasReusedEmail from '~/utils/userHasReusedEmail';
import userHasOldEmail from '~/utils/userHasOldEmail';

import './filter-style.scss';

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({ items }) => {
  const wrongEmailsCount = items.reduce((count, item) => {
    if (userHasWrongEmail(item)) count++;
    return count;
  }, 0);

  const reusedEmailsCount = items.reduce((count, item) => {
    if (userHasReusedEmail(item, items)) count++;
    return count;
  }, 0);

  const oldEmailsCount = items.reduce((count, item) => {
    if (userHasOldEmail(item)) count++;
    return count;
  }, 0);

  return (
    <div className="filter">
      <FilterTab title="All" count={items.length} path={Routes.Users} />
      <FilterTab
        title="Wrong"
        count={wrongEmailsCount}
        path={Routes.WrongEmails}
      />
      <FilterTab
        title="Reused"
        count={reusedEmailsCount}
        path={Routes.ReusedEmails}
      />
      <FilterTab title="Old" count={oldEmailsCount} path={Routes.OldEmails} />
    </div>
  );
};

export default Filter;

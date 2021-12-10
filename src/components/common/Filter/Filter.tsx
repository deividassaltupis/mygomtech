import { FC } from 'react';

// - Common components
import { FilterTab } from '..';

// - Utils
import { countItems } from '~/utils/counter';

// - Interfaces
import { IItem } from '~/types/interfaces';

// - Enums
import { ItemFilter, Routes } from '~/types/enums';

import './filter-style.scss';

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({ items }) => {
  return (
    <div className="filter">
      <FilterTab
        title="All"
        count={countItems(items, ItemFilter.ALL)}
        path={Routes.Users}
      />
      <FilterTab
        title="Wrong"
        count={countItems(items, ItemFilter.WRONG)}
        path={Routes.WrongEmails}
      />
      <FilterTab
        title="Reused"
        count={countItems(items, ItemFilter.REUSED)}
        path={Routes.ReusedEmails}
      />
      <FilterTab
        title="Old"
        count={countItems(items, ItemFilter.OLD)}
        path={Routes.OldEmails}
      />
    </div>
  );
};

export default Filter;

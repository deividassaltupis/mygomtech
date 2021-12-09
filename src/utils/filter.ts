import { IItem } from '~/types/interfaces';
import { ItemFilter } from '~/types/enums';
import * as Check from './checks';

export const filterItems = (items: Array<IItem>, filter) => {
  switch (filter) {
    case ItemFilter.ALL:
      return items;

    case ItemFilter.OLD:
      return items.filter((item) => Check.userHasOldEmail(item));

    case ItemFilter.REUSED:
      return items.filter((item) => Check.userHasReusedEmail(item, items));

    case ItemFilter.WRONG:
      return items.filter((item) => Check.userHasWrongEmail(item));

    default:
      return items;
  }
};

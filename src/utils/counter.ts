import { IItem } from '~/types/interfaces';
import { ItemFilter } from '~/types/enums';
import * as Check from './checks';

export const countItems = (items: Array<IItem>, filter) => {
  switch (filter) {
    case ItemFilter.ALL:
      return items.length;

    case ItemFilter.OLD:
      return items.reduce((count, item) => {
        if (Check.userHasOldEmail(item)) count++;
        return count;
      }, 0);

    case ItemFilter.REUSED:
      return items.reduce((count, item) => {
        if (Check.userHasReusedEmail(item, items)) count++;
        return count;
      }, 0);

    case ItemFilter.WRONG:
      return items.reduce((count, item) => {
        if (Check.userHasWrongEmail(item)) count++;
        return count;
      }, 0);

    default:
      return items.length;
  }
};

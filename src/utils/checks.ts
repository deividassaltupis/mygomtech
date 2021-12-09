import { IItem } from '~/types/interfaces';

export const userHasOldEmail = (item: IItem) => {
  const perdiod = 1000 * 60 * 60 * 24 * 30; // 30 days perdiod in miliseconds = 1000(ms) * 60 (sec) * 60 (min) * 24 (hours) * 30 (days)
  return (
    new Date().valueOf() - new Date(item.emailUpdatedAt).valueOf() > perdiod
  );
};

export const userHasReusedEmail = (item: IItem, itemList: Array<IItem>) => {
  const reusedItems = itemList.filter(
    (listItem) => listItem.email === item.email
  );
  return reusedItems.length > 1;
};

const emailIsValid = (string: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);

export const userHasWrongEmail = (item: IItem) => {
  return !emailIsValid(item.email);
};

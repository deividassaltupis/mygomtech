import { IItem } from '~/services/getUserItems';

const emailIsValid = (string: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);

const userHasWrongEmail = (item: IItem) => {
  return !emailIsValid(item.email);
};

export default userHasWrongEmail;

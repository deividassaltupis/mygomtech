import { IItem } from '~/services/getUserItems';

const userHasOldEmail = (item: IItem) => {
  const perdiod = 1000 * 60 * 60 * 24 * 30; // 30 days perdiod in miliseconds = 1000(ms) * 60 (sec) * 60 (min) * 24 (hours) * 30 (days)
  return (
    new Date().valueOf() - new Date(item.emailUpdatedAt).valueOf() > perdiod
  );
};

export default userHasOldEmail;

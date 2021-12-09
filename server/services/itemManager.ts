import { employees } from '../data';

let items = [];

export const updateItem = (item) => {
  const itemIndex = items.findIndex(
    (currentItem) => currentItem.id === item.id
  );

  if (itemIndex !== -1) items[itemIndex] = item;
  else items.push(item);
};

export const getItems = () => {
  return employees.map((userItem) => {
    const updatedItem = items.find(({ id }) => id === userItem.id);

    return {
      ...(updatedItem || userItem),
    };
  });
};

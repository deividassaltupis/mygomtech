import { FC } from 'react';

// - Interfaces
import { IItem } from '~/types/interfaces';

// - Common components
import { ItemIcon, UpdateModal } from '../';

import './list-style.scss';

interface IList {
  items: Array<IItem>;
  updateListItemFunc: (item: IItem) => any;
}

const List: FC<IList> = ({ items, updateListItemFunc }) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <li className="item" key={item.id}>
          <ItemIcon name={item.name} />
          <div>
            <div className="title">{item.name}</div>
            <div className="description">{item.email}</div>
          </div>
          <UpdateModal item={item} updateListItemFunc={updateListItemFunc} />
        </li>
      ))}
    </ul>
  );
};

export default List;

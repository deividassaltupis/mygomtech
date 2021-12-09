import { FC, useState } from 'react';
import { IItem } from '~/services/getUserItems';
import ItemIcon from './components/ItemIcon';
import updateItem from '../../../../services/updateItem';
import Modal from 'react-modal';

import './list-style.scss';

interface IList {
  items: Array<IItem>;
  updateListItemFunc: (item: IItem) => any;
}

interface IUpdateModal {
  item: IItem;
  updateListItemFunc: (item: IItem) => any;
}

const UpdateModal: FC<IUpdateModal> = ({ item, updateListItemFunc }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  // - Function which sends edited item data to server as well as updates it locally
  const updateEmailHandler = async () => {
    const updatedItem = { ...item, email: newEmail };

    // - Update item data in server
    await updateItem(updatedItem);

    // - Update item data in currently displayed items list
    updateListItemFunc(updatedItem);

    // - Hide modal and empty input
    setShowModal(false);
    setNewEmail('');
  };

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Email
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Email</h1>
        <input
          placeholder="new email"
          className="input"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button className="button" onClick={updateEmailHandler}>
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

const List: FC<IList> = ({ items, updateListItemFunc }) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <li className="item">
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

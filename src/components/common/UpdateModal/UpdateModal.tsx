import { FC, useState } from 'react';
import Modal from 'react-modal';

// - Iterfaces
import { IItem } from '~/types/interfaces';

// - Services
import { updateItem } from '~/services';

interface IUpdateModal {
  item: IItem;
  updateListItemFunc: (item: IItem) => any;
}

const UpdateModal: FC<IUpdateModal> = ({ item, updateListItemFunc }) => {
  Modal.setAppElement('body');
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  // - Function which sends edited item data to server as well as updates it locally
  const updateEmailHandler = async () => {
    const updatedItem = {
      ...item,
      email: newEmail,
      emailUpdatedAt: new Date().toISOString(),
    };

    // - Update item data in server
    await updateItem(updatedItem);

    // - Update item data in currently displayed items list
    updateListItemFunc(updatedItem);

    // - Hide modal and empty input
    setNewEmail('');
    setShowModal(false);
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

export default UpdateModal;

import { Router } from 'express';
import authentication from '../middleware/authentication';
import { getItems, updateItem } from '../services/itemManager';

import { IEmployee } from '../types/interfaces';

const router = Router();

router.get('/api/items', authentication, (req, res) => {
  res.status(200).json({
    items: getItems(),
  });
});

router.post('/api/items', authentication, (req, res) => {
  const { id, name, role, email } = req.body;

  if (!id || !name || !role || !email) {
    res.status(400).send('mandatory parameter is missing');
    return;
  }

  const items = getItems();
  // - Find item that's currently intended to be updated
  const currentItem = items.find((item) => item.id === id);

  // - Create updated item object
  const updatedItem: IEmployee = {
    id,
    name,
    role,
    email,
    createdAt: currentItem.createdAt,
    emailUpdatedAt: currentItem.emailUpdatedAt,
  };

  // - If old email do not equals new email - email update date must be recorded
  if (currentItem.email !== email)
    updatedItem.emailUpdatedAt = new Date().toISOString();

  // - Finnaly update the item
  updateItem(updatedItem);

  res.status(200).send();
});

export default router;

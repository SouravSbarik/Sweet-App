import express from 'express';
import {
  addSweet,
  getAllSweets,
  updateSweet,
  deleteSweet,
  searchSweets,
  purchaseSweet,
  restockSweet,
} from '../controllers/sweetController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addSweet).get(protect, getAllSweets);
router.route('/search').get(protect, searchSweets);

router
  .route('/:id')
  .put(protect, updateSweet)
  .delete(protect, admin, deleteSweet);

router.route('/:id/purchase').post(protect, purchaseSweet);
router.route('/:id/restock').post(protect, admin, restockSweet);

export default router;
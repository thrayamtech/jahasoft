const express = require('express');
const router = express.Router();
const {
  getBOMs,
  getBOM,
  getBOMByProduct,
  createBOM,
  updateBOM,
  duplicateBOM,
  deleteBOM,
  checkAvailability
} = require('../../controllers/billing/bomController');
const { protect, authorize } = require('../../middleware/auth');

router.get('/', protect, authorize('admin', 'staff'), getBOMs);
router.get('/:id', protect, authorize('admin', 'staff'), getBOM);
router.get('/product/:productId', protect, authorize('admin', 'staff'), getBOMByProduct);
router.get('/:id/availability', protect, authorize('admin', 'staff'), checkAvailability);
router.post('/', protect, authorize('admin', 'staff'), createBOM);
router.post('/:id/duplicate', protect, authorize('admin', 'staff'), duplicateBOM);
router.put('/:id', protect, authorize('admin', 'staff'), updateBOM);
router.delete('/:id', protect, authorize('admin'), deleteBOM);

module.exports = router;

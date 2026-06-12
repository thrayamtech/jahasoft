const express = require('express');
const router = express.Router();
const {
  getPurchaseReturns,
  getPurchaseReturn,
  createPurchaseReturn,
  confirmPurchaseReturn,
  deletePurchaseReturn
} = require('../../controllers/billing/purchaseReturnController');
const { protect, authorize } = require('../../middleware/auth');

router.get('/', protect, authorize('admin', 'staff'), getPurchaseReturns);
router.get('/:id', protect, authorize('admin', 'staff'), getPurchaseReturn);
router.post('/', protect, authorize('admin', 'staff'), createPurchaseReturn);
router.put('/:id/confirm', protect, authorize('admin', 'staff'), confirmPurchaseReturn);
router.delete('/:id', protect, authorize('admin'), deletePurchaseReturn);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getSalesReturns,
  getSalesReturn,
  createSalesReturn,
  confirmSalesReturn,
  processRefund,
  deleteSalesReturn
} = require('../../controllers/billing/salesReturnController');
const { protect, authorize } = require('../../middleware/auth');

router.get('/', protect, authorize('admin', 'staff'), getSalesReturns);
router.get('/:id', protect, authorize('admin', 'staff'), getSalesReturn);
router.post('/', protect, authorize('admin', 'staff'), createSalesReturn);
router.put('/:id/confirm', protect, authorize('admin', 'staff'), confirmSalesReturn);
router.put('/:id/refund', protect, authorize('admin', 'staff'), processRefund);
router.delete('/:id', protect, authorize('admin'), deleteSalesReturn);

module.exports = router;

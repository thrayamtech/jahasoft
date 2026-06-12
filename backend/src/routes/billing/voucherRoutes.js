const express = require('express');
const router = express.Router();
const {
  getVouchers,
  getVoucher,
  createPaymentVoucher,
  createReceiptVoucher,
  createJournalVoucher,
  createExpenseVoucher,
  updateVoucher,
  deleteVoucher,
  getExpenseSummary
} = require('../../controllers/billing/voucherController');
const { protect, authorize } = require('../../middleware/auth');

// Staff can view vouchers; only admin can create, edit, or delete them
router.get('/', protect, authorize('admin', 'staff'), getVouchers);
router.get('/expense-summary', protect, authorize('admin', 'staff'), getExpenseSummary);
router.get('/:id', protect, authorize('admin', 'staff'), getVoucher);
router.post('/payment', protect, authorize('admin'), createPaymentVoucher);
router.post('/receipt', protect, authorize('admin'), createReceiptVoucher);
router.post('/journal', protect, authorize('admin'), createJournalVoucher);
router.post('/expense', protect, authorize('admin'), createExpenseVoucher);
router.put('/:id', protect, authorize('admin'), updateVoucher);
router.delete('/:id', protect, authorize('admin'), deleteVoucher);

module.exports = router;

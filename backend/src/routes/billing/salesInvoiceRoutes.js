const express = require('express');
const router = express.Router();
const {
  getSalesInvoices,
  getSalesInvoice,
  createSalesInvoice,
  updateSalesInvoice,
  confirmSalesInvoice,
  recordPayment,
  deleteSalesInvoice,
  getInvoiceForPrint
} = require('../../controllers/billing/salesInvoiceController');
const { protect, authorize } = require('../../middleware/auth');

router.get('/', protect, authorize('admin', 'staff'), getSalesInvoices);
router.get('/:id', protect, authorize('admin', 'staff'), getSalesInvoice);
router.get('/:id/print', protect, authorize('admin', 'staff'), getInvoiceForPrint);
router.post('/', protect, authorize('admin', 'staff'), createSalesInvoice);
router.put('/:id', protect, authorize('admin', 'staff'), updateSalesInvoice);
router.put('/:id/confirm', protect, authorize('admin', 'staff'), confirmSalesInvoice);
router.put('/:id/payment', protect, authorize('admin', 'staff'), recordPayment);
router.delete('/:id', protect, authorize('admin'), deleteSalesInvoice);

module.exports = router;

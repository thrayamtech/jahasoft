const express = require('express');
const router = express.Router();
const {
  // Purchase Orders
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrder,
  updatePOStatus,
  deletePurchaseOrder,
  // Purchase Invoices
  getPurchaseInvoices,
  getPurchaseInvoice,
  createPurchaseInvoice,
  createFromPO,
  recordPayment,
  deletePurchaseInvoice
} = require('../../controllers/billing/purchaseController');
const { protect, authorize } = require('../../middleware/auth');

// Purchase Orders
router.get('/orders', protect, authorize('admin', 'staff'), getPurchaseOrders);
router.get('/orders/:id', protect, authorize('admin', 'staff'), getPurchaseOrder);
router.post('/orders', protect, authorize('admin', 'staff'), createPurchaseOrder);
router.put('/orders/:id', protect, authorize('admin', 'staff'), updatePurchaseOrder);
router.put('/orders/:id/status', protect, authorize('admin', 'staff'), updatePOStatus);
router.delete('/orders/:id', protect, authorize('admin'), deletePurchaseOrder);

// Purchase Invoices
router.get('/invoices', protect, authorize('admin', 'staff'), getPurchaseInvoices);
router.get('/invoices/:id', protect, authorize('admin', 'staff'), getPurchaseInvoice);
router.post('/invoices', protect, authorize('admin', 'staff'), createPurchaseInvoice);
router.post('/invoices/from-po/:poId', protect, authorize('admin', 'staff'), createFromPO);
router.put('/invoices/:id/payment', protect, authorize('admin', 'staff'), recordPayment);
router.delete('/invoices/:id', protect, authorize('admin'), deletePurchaseInvoice);

module.exports = router;

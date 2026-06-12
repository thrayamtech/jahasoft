const express = require('express');
const router = express.Router();
const {
  getProductionOrders,
  getProductionOrder,
  createProductionOrder,
  startProduction,
  recordConsumption,
  completeProduction,
  cancelProduction,
  deleteProductionOrder
} = require('../../controllers/billing/productionController');
const { protect, authorize } = require('../../middleware/auth');

router.get('/', protect, authorize('admin', 'staff'), getProductionOrders);
router.get('/:id', protect, authorize('admin', 'staff'), getProductionOrder);
router.post('/', protect, authorize('admin', 'staff'), createProductionOrder);
router.put('/:id/start', protect, authorize('admin', 'staff'), startProduction);
router.put('/:id/consumption', protect, authorize('admin', 'staff'), recordConsumption);
router.put('/:id/complete', protect, authorize('admin', 'staff'), completeProduction);
router.put('/:id/cancel', protect, authorize('admin', 'staff'), cancelProduction);
router.delete('/:id', protect, authorize('admin'), deleteProductionOrder);

module.exports = router;

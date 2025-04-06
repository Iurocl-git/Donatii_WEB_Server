const {Router} = require('express');
const controller = require('./pay_controller');
const router = Router();

// router.use('/displayData', controller.displayData);

router.post('/pay', controller.paymentHandler);
router.post('/create-subscription', controller.subscriptionHandler);


// setInterval(() => {
//   controller.getData({}, {});
// }, 18000);


module.exports = router;
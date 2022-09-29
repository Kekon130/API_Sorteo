const { Router } = require('express');

const controller = require('../controllers/sellerController');

const router = Router();

router.get('/getAllTickets',controller.allTikets);

module.exports = router;
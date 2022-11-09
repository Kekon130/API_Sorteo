const { Router } = require('express');

const controller = require('../controllers/clientController');
const middleware = require('../middleware/authentication');

const router = Router();

router.get('/seeAllTicketsOwned/:telegram',middleware.loggin,controller.ticketsOwned)

module.exports = router;
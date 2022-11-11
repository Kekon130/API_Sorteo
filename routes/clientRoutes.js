const { Router } = require('express');

const controller = require('../controllers/clientController');
const middleware = require('../middleware/authentication');

const router = Router();

router.get('/allTicketOwned/',middleware.loggin,controller.ticketsOwned)
router.get('/allClient/',middleware.loggin,controller.allClients);

module.exports = router;
const { Router } = require('express');

const controller = require('../controllers/clientController');
const middleware = require('../middleware/authentication');

const router = Router();

router.get('/allTicketOwned/:telegram',middleware.loggin,controller.ticketsOwned) //No detecta los parametros


router.get('/allClient/',middleware.loggin,controller.allClients);

module.exports = router;
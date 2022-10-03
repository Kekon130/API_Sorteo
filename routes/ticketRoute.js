const {Router} = require('express');

const controller = require('../controllers/ticketController')

const router = Router();

router.get('/getTicketByGame/:game', controller.findByGame);

module.exports=router;
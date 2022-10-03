const {Router} = require('express');

const controller = require('../controllers/ticketController')

const router = Router();

router.get('/getTicketByGame/:game', controller.findByGame);

router.get('./getTicketByName/:name', controller.findByName);

router.get('./getTicketByNumber/:id',controller.findByNumber);

router.get('./',controller.allTikets);

module.exports=router;
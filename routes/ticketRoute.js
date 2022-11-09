const {Router} = require('express');

const controller = require('../controllers/ticketController');
const middleware = require('../middleware/authentication');

const router = Router();

//Routas para los usuarios standars
router.get('/getTicketByGame/:game', controller.findByGame);
router.get('/getTicketByName/:name', controller.findByName);
router.get('/getTicketByNumber/:id',controller.findByNumber);

//Estas rutas son para los vendedores y ver que cliente tiene asociado
router.get('/getTicketByGameAuth/:game',middleware.loggin,controller.findByGame);
router.get('/getTicketByNameAuth/:name',middleware.loggin,controller.findByName);
router.get('/getTicketByNumberAuth/:id',middleware.loggin,controller.findByNumber);
router.post('/sellTicket/',middleware.loggin,controller.sellTicket);

router.get('./',controller.allTikets);

module.exports=router;
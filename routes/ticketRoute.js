const {Router} = require('express');

const controller = require('../controllers/ticketController');
const middleware = require('../middleware/authentication');

const router = Router();

//Routas para los usuarios standars
router.get('/getTicketByGame/:game',controller.findByGame);
router.get('/getTicketByName/:name',controller.findByName);
router.get('/getTicketByNumber/:id',controller.findByNumber);
router.get('/allTicket',controller.allTickets);

//Estas rutas son para los vendedores y ver que cliente tiene asociado
router.get('/getTicketByGameAuth/:game',middleware.loggin,controller.findByGameAuth);
router.get('/getTicketByNameAuth/:name',middleware.loggin,controller.findByNameAuth);
router.get('/getTicketByNumberAuth/:id',middleware.loggin,controller.findByNumberAuth);


router.patch('/sellTicket/',middleware.loggin,controller.sellTicket);
router.patch('/reserveTicket/:id',middleware.loggin,controller.reserveTicket)


router.get('/',(req,res)=>{
    return res.status(200).send('Gestion de tickets')
});

module.exports=router;
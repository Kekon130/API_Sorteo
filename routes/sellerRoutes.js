const { Router } = require('express');

const controller = require('../controllers/sellerController');

const router = Router();

router.get('/getAllTickets',controller.allTikets);

router.get('/',(req,res)=>{
    res.send('Gestion de tickets'); 
})

module.exports = router;
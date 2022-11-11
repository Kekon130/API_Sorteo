const { Router } = require('express');

const controller = require('../controllers/sellerController');
const middleware = require('../middleware/authentication');

const router = Router();


router.get('/',(req,res)=>{
    res.send('Gestion de tickets'); 
})
router.post('/register',middleware.loggin,controller.createUserByEmailAndPassword);

router.get('/login',controller.login);

router.get('/allSellers',middleware.loggin,controller.allSellers);

module.exports = router;
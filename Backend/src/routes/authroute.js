const Express = require('express')
const router = Express.Router()
const authcontroler = require('../controller/authcontroler')

//Register User Route
router.post('/register',authcontroler.registeruser)

//Login user Route
router.post('/login',authcontroler.loginuser)

//Logout user Route
router.get('/logout',authcontroler.logoutuser)

//Register food partner Route
router.post('/Registerfoodpartner',authcontroler.regiterfoodpartner)

//Login Food partner Route
router.post('/loginfoodpartner',authcontroler.loginfoodpartner)

//Logout Foodpartner Route
router.get('/logoutfoodpartner',authcontroler.logoutfoodpartner)
module.exports = router;

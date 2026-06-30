const Express = require('express')
const router = Express.Router()
const foodcontroler = require('../controller/foodcontroler')
const authmiddleware = require('../middleware/auth.middleware')
const multer = require('multer')

const upload = multer({
    storage:multer.memoryStorage()
})

//post  food prefix/[proteced]
router.post('/',authmiddleware.authmiddleware,upload.single('video'),foodcontroler.createfood)

//get food [protected]
router.get('/',foodcontroler.getfooditem)

router.post('/like',authmiddleware.authusermiddleware,foodcontroler.likeFood)

router.post('/save',authmiddleware.authusermiddleware,foodcontroler.saveFood)

router.get('/save',authmiddleware.authusermiddleware,foodcontroler.getSaveFood)


module.exports = router
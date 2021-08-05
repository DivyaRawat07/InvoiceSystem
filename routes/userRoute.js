const router = require('express').Router()
const auth = require('../middleware/auth')
router.post('/signUp',auth.signUp)
router.post('/login',auth.login)
router.patch('/resetPassword',auth.resetPassword)
router.get('/getUser',auth.getUser)


module.exports = router;

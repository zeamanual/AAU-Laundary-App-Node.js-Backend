let express = require('express')
let router = express.Router()
let {getAll,getOne,update,deleteOne,signup,login,logout} = require('../controllers/user')

router.post('/login',login)
router.post('/logout',logout)
router.post('/signup',signup)
router.route('/').get(getAll)
router.route("/id").get(getOne).delete(deleteOne).put(update)
module.exports=router
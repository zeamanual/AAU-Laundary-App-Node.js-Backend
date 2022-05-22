let express = require('express')
let router = express.Router()
let {getAll,getOne,update,updateToken,deleteOne,signup,login,logout,getUserOrder} = require('../controllers/user')

router.post('/login',login)
router.get('/token',updateToken)
router.delete('/logout',logout)
router.post('/signup',signup)
router.get('/order/:id',getUserOrder)
router.route('/').get(getAll)
router.route("/:id").get(getOne).delete(deleteOne).put(update)
module.exports=router
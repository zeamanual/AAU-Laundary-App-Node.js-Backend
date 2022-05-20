let express = require('express')
let router = express.Router()
let {getAll,getOne,update,deleteOne,create} = require('../controllers/cloth')
router.route('/').get(getAll).post(create)
router.route("/:id").get(getOne).delete(deleteOne).put(update)
module.exports=router

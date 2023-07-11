const express = require('express')
const router = express.Router()



router.use('/user',require('../routes/user/index'))
router.get('/',(req,res)=>{
res.send("welcome to POS")
})


module.exports = router
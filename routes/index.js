const express = require('express')
const router = express.Router()



//router.use('/')
router.get('/',(req,res)=>{
res.send("welcome to POS")
})


module.exports = router
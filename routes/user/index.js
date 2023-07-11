const express = require('express')
const { createUser } = require('../../controller/User')
const router = express.Router()


router.post("/signup" , createUser )



// create 
//update 
// delete soft 
//get
// login
// change password --- current password ,new password
// reset password  ---- 


module.exports = router
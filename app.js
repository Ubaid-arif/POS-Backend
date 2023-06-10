const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
dotenv.config()
const port = process.env.PORT || 3001

app.listen(port,async ()=>{
    console.log(`app is runnig on port ${port}`)
    await prisma.$connect().then(console.log("db connect"))
})
app.use(cors({origin  :'*'}))
app.use(helmet())
app.use(express.json())
app.use('/',require('./routes') )

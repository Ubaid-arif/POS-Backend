const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
dotenv.config()
const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`app is runnig on port ${port}`)
})
app.use(cors({origin  :'*'}))
app.use(helmet())
app.use(express.json())
app.use('/',require('./routes') )

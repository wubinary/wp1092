import express from 'express'
import routes from './routes.index'
import mongoose from 'mongoose'
import { dataInit } from './upload'

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const port = process.env.PORT || 4000
const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10
}
// connect mongo correctly
// coding here ...
mongoose.connect(process.env.MONGO_URL, {useCreateIndex: true, useUnifiedTopology: true}, dataInit);

routes(app)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");


const userRoute = require("./routes/users")
const pinRoute = require("./routes/pins")



//import Route



//import Route

dotenv.config()
const corsOpt = {
  origin: ['http://localhost:3000', 'http://localhost:8000'],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}

//MIDLEWARE
app.use(morgan("common")); //Log HTTP request
app.use(cors(corsOpt))
app.use(express.json()); //Parse JSON rquest bodies
app.use(helmet({
  crossOriginResourcePolicy: false
}))

//MIDLEWARE

// app.listen(8800, () => {
//   console.log("Backend server is running!!!")
// })


mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDb")
    app.listen(8800, () => {
      console.log("Backend server is running!!!")
    })
  })
  .catch((error) => {
    console.log("error to connect :", error)
  })


//ROUTE
app.get("/", (req, res) => {
  res.status(200).json("OKEE")
})

app.use("/api/users", userRoute)

app.use("/api/pins", pinRoute)
const express = require("express")
var cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")

const app = express(); 
const errorMiddleWare = require("./middleware/error")
const cookieParser = require("cookie-parser")
app.use(fileUpload())
app.use(cors())
app.use(express.json())
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));
const product = require("./routes/productRoute")
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoute")


app.use("/api/v1" , order)
app.use("/api/v1", product)
app.use("/api/v1", user)
// Middleware for Errors
app.use(errorMiddleWare)

module.exports = app
const express = require("express")
var cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const path = require ("path")
const app = express(); 
const errorMiddleWare = require("./middleware/error")
const cookieParser = require("cookie-parser")

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}



app.use(fileUpload())
app.use(cors())
app.use(express.json())
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));
const product = require("./routes/productRoute")
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoute")
const category = require("./routes/categoryRoute")


app.use("/api/v1" , order)
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", category)
app.use(express.static(path.join(__dirname, "../frontend/build"))) 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})
    
// Middleware for Errors
app.use(errorMiddleWare)

module.exports = app
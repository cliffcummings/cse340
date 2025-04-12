/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()

// TODO - DELETE - Move to routes/static.js
// const router = express.Router()
// router.use(express.static("public"))
// END - TODO - DELETE

// Exported from routes/static
const static = require("./routes/static")
app.use(static)

const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const Util = require("./utilities")
const utilities = require("./utilities/")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
// expressLayouts directs all res.render (rendering) commands
// to start looking in the views/layouts directory
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes - uses inventoryRoute.js file
app.use("/inv", inventoryRoute)
//--------------------------------------------------
// File Not Found Route - must be last route in list
//--------------------------------------------------
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have REALLY LOST that page.'})
})

/* ************************
 * Express Error Handler
 * Place after all other middleware
 *************************/ 
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){message = err.message}
  else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

//---------------------------------------------------------------------------------
// Class Notes:
// In a small application all routes could be written in the main file (server.js).
// However, as applications grow larger and more complex, the routes for a specific
// type of interaction are broken out into their own files. 
// These specific route files will be stored in the routes directory.
//---------------------------------------------------------------------------------
const express = require("express")
const router = new express.Router()

const funController = require("../controllers/funController")

router.get("/bike", funController.theBikes)

router.get("/car", funController.theCars)

router.get("/house", funController.theHouse)

module.exports = router;
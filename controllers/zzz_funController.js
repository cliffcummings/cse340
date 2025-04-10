async function theBikes (req, res) {
res.render("./fun-stuff/abc", {things:"bike!", content:"Cool bicycles"})
}

async function theCars (req, res) {
res.render("./fun-stuff/abc", {things:"car!", content:"Best cars sold here"})
}

async function theHouse(req, res) {
res.render("./fun-stuff/abc", {things:"house!", content:"Upscale homes"})
}

module.exports = {theBikes, theCars, theHouse}
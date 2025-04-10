const exampleController = {};

 exampleController.buildHome = async function (req, res) {
    res.render("index", {title:"Home", nav: undefined})
  }

  module.exports = exampleController;
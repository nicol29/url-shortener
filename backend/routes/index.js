var express = require('express');
var router = express.Router();
var url_controller = require("../controllers/urlController");

/* GET home page. */
// router.get('/api', function(req, res, next) {
//   console.log("lol")
// });

router.post('/api', url_controller.url_create);

router.get('/api/linkTo/:vidId', url_controller.url_get);

module.exports = router;

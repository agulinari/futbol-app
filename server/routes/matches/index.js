// Import extensions
var express = require('express'),
controller = require('./matches.controller');
// Define router
var router = express.Router();
// Define routes
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/summary', controller.summary);
router.get('/:id/teams', controller.teams);
// Export module
module.exports = router;
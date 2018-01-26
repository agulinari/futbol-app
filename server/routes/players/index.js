// Import extensions
var express = require('express'),
controller = require('./players.controller');
// Define router
var router = express.Router();
// Define routes
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/stats', controller.stats);
router.get('/:id/evolution', controller.evolution);
// Export module
module.exports = router;
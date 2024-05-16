const express = require("express");
const router = express.Router(); 
const logOutController = require("../../controllers/logOutConroller");

router.get('/', logOutController.handleLogout );

module.exports = router;
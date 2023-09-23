const express = require("express");
const userController = require("../controller/Controller");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route('/userview').get(userController.jobview);
router.route('/deletejob/:id').delete(userController.deletejob);
router.route('/editjob/:id/:edit').patch(userController.editjob);
router.route('/add_employee').post(userController.add_employee);
router.route('/test').post(verifyToken, (req, res) => {
    res.json({authData:req.authData});
  });

module.exports = router;
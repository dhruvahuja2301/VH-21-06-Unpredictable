const express = require('express');
const router =  express.Router();
const { submitApplication, showApplication, updateStatus, removeApplication } = require("../controller/application");

router.route("/:applicantId([0-9a-f]{24})/:jobId([0-9a-f]{24})")
	.post(submitApplication)
router.route("/:id([0-9a-f]{24})")
    .put(updateStatus)
    .get(showApplication)
    .delete(removeApplication);

module.exports = router
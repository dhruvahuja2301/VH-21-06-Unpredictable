const express = require('express');
const router =  express.Router();
const { index, createJob, showJob, updateJob, deleteJob} = require("../controller/job");

router.route("/")
    .get(index)
    

router.route("/:id([0-9a-f]{24})")
    .get(showJob)
    .put(updateJob)
    .post(createJob)
    .delete(deleteJob);

module.exports = router
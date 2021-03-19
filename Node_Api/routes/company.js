const express = require('express');
const router =  express.Router();
const company = require("../controller/company");

router.route("/")
    .get(company.index)
    .post(company.createCompany)

router.route("/:id([0-9a-f]{24})")
    .get(company.showCompany)
    .put(company.updateCompany)
    .delete(company.deleteCompany);

module.exports = router
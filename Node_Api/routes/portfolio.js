const express = require('express');
const router =  express.Router();
const portfolio = require("../controller/portfolio");

router.route("/:id([0-9a-f]{24})")
    .post(portfolio.createPortfolio) // id of user for other id of portfolio
    .get(portfolio.showPortfolio)
    .put(portfolio.updatePortfolio)

module.exports = router
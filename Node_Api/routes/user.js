const express = require('express');
const router =  express.Router();
const user = require("../controller/user");

router.route("/")
    .get(user.index)
    .post(user.createUser)

router.route("/:id([0-9a-f]{24})")
    .get(user.showUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

module.exports = router
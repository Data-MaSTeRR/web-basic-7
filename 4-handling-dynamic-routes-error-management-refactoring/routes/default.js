const express = require("express");
const router = express.Router();

// 메인 페이지
router.get("/", function (req, res) {
  res.render("index");
});

// About
router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router;

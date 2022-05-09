const express = require("express");

const books = require("./books/books.routes");
const users = require("./users/users.routes");
const comments = require("./comments/comments.routes");
const apiTitle = require("../constants/apiTitle");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: apiTitle.message,
  });
});

router.use("/books", books);
router.use("/users", users);
router.use("/comments", comments);

module.exports = router;

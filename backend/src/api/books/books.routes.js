const express = require("express");

const { Book, relationName } = require("./books.model");
const tableNames = require("../../constants/tableNames");

const router = express.Router();

fields = [
  `${tableNames.book}.id`,
  `${tableNames.book}.title`,
  `${tableNames.book}.isbn`,
  `${tableNames.book}.author`,
  `${tableNames.book}.summary`,
  `${relationName.images}.url`,
  `${tableNames.book}.created_at`,
  `${tableNames.book}.updated_at`,
];

router.get("/", async (req, res) => {
  const books = await Book.query()
    .select(fields)
    .joinRelated(relationName.images);
  res.json(books);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.query()
      .select(fields)
      .joinRelated(relationName.images)
      .where(`${tableNames.book}.id`, parseInt(id, 10) || 0)
      .first();
    if (book) {
      return res.json(book);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

const express = require("express");

const { Comment, relationName } = require("./comments.model");
const tableNames = require("../../constants/tableNames");

const router = express.Router();

fields = [
  `${tableNames.comment}.id`,
  `${relationName.book}.id as book_id`,
  `${relationName.user}.id as user_id`,
  `${relationName.user}.name`,
  `${tableNames.comment}.comment`,
  `${tableNames.comment}.created_at`,
  `${tableNames.comment}.updated_at`,
];

router.get("/", async (req, res) => {
  const users = await Comment.query()
    .select(fields)
    .joinRelated(`[${relationName.book}, ${relationName.user}]`);
  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.query()
      .select(fields)
      .joinRelated(`[${relationName.book}, ${relationName.user}]`)
      .where(`${tableNames.comment}.id`, parseInt(id, 10) || 0)
      .first();
    if (comment) {
      return res.json(comment);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/byBookId/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.query()
      .select(fields)
      .joinRelated(`[${relationName.book}, ${relationName.user}]`)
      .where(`${relationName.book}.id`, parseInt(id, 10) || 0)
      .first();
    if (comment) {
      return res.json(comment);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/byUserId/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.query()
      .select(fields)
      .joinRelated(`[${relationName.book}, ${relationName.user}]`)
      .where(`${relationName.user}.id`, parseInt(id, 10) || 0)
      .first();
    if (comment) {
      return res.json(comment);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

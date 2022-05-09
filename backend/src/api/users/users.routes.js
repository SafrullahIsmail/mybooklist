const express = require("express");

const User = require("./users.model");

const router = express.Router();

fields = [
  "id",
  "name",
  "email",
  "is_admin",
  "last_login",
  "created_at",
  "updated_at",
];

router.get("/", async (req, res) => {
  const users = await User.query().select(fields);
  res.json(users);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.query()
      .select(fields)
      .where("id", parseInt(id, 10) || 0)
      .first();
    if (user) {
      return res.json(user);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

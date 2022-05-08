const bcrypt = require("bcrypt");
const crypto = require("crypto");
const tableNames = require("../../src/constants/tableNames");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await Promise.all(
    Object.keys(tableNames).map((tableName) => knex(tableName).del())
  );

  const password = crypto.randomBytes(15).toString("hex");
  console.log(password);

  const user = {
    email: "sm@null.com",
    password: await bcrypt.hash(password, 12),
    name: "sm",
  };

  const [createdUser] = await knex(tableNames.user).insert(user);
  // const [users] = await knex(tableNames.user).where("id", createdUser);

  const book = {
    title: "judul buku",
    isbn: "1234567890123",
    author: "sm",
    summary: "ini buku bagus",
  };

  const [createdBook] = await knex(tableNames.book).insert(book);
  // const [books] = await knex(tableNames.book).where("id", createdBook);
};

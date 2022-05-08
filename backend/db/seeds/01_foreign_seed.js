const tableNames = require("../../src/constants/tableNames");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  const [user, book] = await Promise.all([
    knex(tableNames.user).first(),
    knex(tableNames.book).first(),
  ]);

  book_image = {
    book_id: book.id,
    url: "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
  };

  const [book_images] = await knex(tableNames.book_image).insert(book_image);
  // const [image] = await knex(tableNames.book_image).where("id", book_images);

  comment = {
    user_id: user.id,
    book_id: book.id,
    comment: "ini sangat direkomendasi",
  };

  const [comments] = await knex(tableNames.comment).insert(comment);
  // const [com] = await knex(tableNames.comment).where("id", comments);
};

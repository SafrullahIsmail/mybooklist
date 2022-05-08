const tableNames = require("../../src/constants/tableNames");

function addDefaultColumns(table) {
  table.timestamps(false, true);
}

function references(table, tableNames) {
  table.integer(`${tableNames}_id`).unsigned();
  table
    .foreign(`${tableNames}_id`)
    .references("id")
    .inTable(tableNames)
    .onDelete("cascade");
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table) => {
      table.increments().notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 500).notNullable();
      table.string("name").notNullable();
      table.boolean("is_admin").notNullable().defaultTo(0);
      table.datetime("last_login");
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.book, (table) => {
      table.increments().notNullable();
      table.string("title").notNullable();
      table.string("isbn", 13).notNullable().unique();
      table.string("author").notNullable();
      table.text("summary");
      addDefaultColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.comment, (table) => {
    table.increments().notNullable();
    references(table, "user");
    references(table, "book");
    table.text("comment").notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.book_image, (table) => {
    table.increments().notNullable();
    references(table, "book");
    table.string("url", 2000);
    addDefaultColumns(table);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.book_image,
      tableNames.comment,
      tableNames.book,
      tableNames.user,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};

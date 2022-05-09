const { Model } = require("objection");
require("../../db");
const tableNames = require("../../constants/tableNames");
const schema = require("./book_images.schema.json");

class BookImage extends Model {
  static get tableName() {
    return tableNames.book_image;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    const Book = require("../books/books.model");

    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: `${tableNames.book_image}.id`,
          to: `${tableNames.book}.book_id`,
        },
      },
    };
  }
}

module.exports = BookImage;

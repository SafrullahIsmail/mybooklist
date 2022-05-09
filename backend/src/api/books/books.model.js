const { Model } = require("objection");
require("../../db");
const tableNames = require("../../constants/tableNames");
const schema = require("./books.schema.json");

class Book extends Model {
  static get tableName() {
    return tableNames.book;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    const BookImage = require("../book_images/book_images.model");
    const { Comment } = require("../comments/comments.model");

    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: BookImage,
        join: {
          from: `${tableNames.book}.id`,
          to: `${tableNames.book_image}.book_id`,
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: `${tableNames.book}.id`,
          to: `${tableNames.comment}.book_id`,
        },
      },
    };
  }
}

module.exports = {
  Book,
  relationName: { images: "images", comments: "comments" },
};

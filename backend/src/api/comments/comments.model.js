const { Model } = require("objection");
require("../../db");
const tableNames = require("../../constants/tableNames");
const schema = require("./comments.schema.json");

class Comment extends Model {
  static get tableName() {
    return tableNames.comment;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    const { User } = require("../users/users.model");
    const { Book } = require("../books/books.model");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${tableNames.comment}.user_id`,
          to: `${tableNames.user}.id`,
        },
      },
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: `${tableNames.comment}.book_id`,
          to: `${tableNames.book}.id`,
        },
      },
    };
  }
}

module.exports = {
  Comment,
  relationName: { user: "user", book: "book" },
};

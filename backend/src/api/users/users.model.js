const { Model } = require("objection");
require("../../db");
const tableNames = require("../../constants/tableNames");
const schema = require("./users.schema.json");

class User extends Model {
  static get tableName() {
    return tableNames.user;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    const { Comment } = require("../comments/comments.model");

    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: `${tableNames.book}.id`,
          to: `${tableNames.comment}.user_id`,
        },
      },
    };
  }
}

module.exports = { User, relationName: { comments: "comments" } };

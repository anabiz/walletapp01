/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      notNull: true,
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
      comment: "The unique id of the user",
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },

    email: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    user_type: {
        type: "varchar(4)",
        notNull: true,
      },
    password: {
      type: "varchar(100)",
      notNull: true,
      unique: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    is_verified: {
      type: "bool",
      default: false,
    },
    is_admin: {
      type: "bool",
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
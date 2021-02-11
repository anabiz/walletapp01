/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("currency", {
        id: {
          type: "uuid",
          notNull: true,
          primaryKey: true,
          default: pgm.func("uuid_generate_v4()"),
          comment: "The unique id of the currency",
        },
        name: {
            type: "varchar(20)",
            notNull: true,
          },
    })
};

exports.down = pgm => {
     pgm.dropTable("currency");
};

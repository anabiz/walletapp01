/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("transactions", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
            comment: "The unique id of the transaction",
        },
        user_id: {
            type: "uuid",
            notNull: true,
            references: '"users"',
        },
        transaction_type: {
            type: "varchar(20)",
            notNull: true,
          },
        currency_id: {
            type: "uuid",
            notNull: true,
            references: '"currency"'
        },
        amount: {
            type: "numeric(15,4)",
            notNull: true,
        },
        is_approved: {
            type: "bool",
            default: false,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

exports.down = pgm => {
    pgm.dropTable("transactions");
};

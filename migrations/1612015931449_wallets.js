/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("wallets", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
            comment: "The unique id of the wallet",
        },
        user_id: {
            type: "uuid",
            notNull: true,
            references: '"users"',
            onDelete: "cascade",
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
        is_main: {
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
    pgm.dropTable("wallets");
};

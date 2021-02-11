import createConnectionPool, { sql } from '@databases/pg';
import { DATABASE_URL } from "../setting"

// N.B. you will need to replace this connection
// string with the correct string for your database.
const db = createConnectionPool(
  DATABASE_URL
);
///console.log(DATABASE_URL)
//console.log(process.env.DATABASE)
export { db, sql };
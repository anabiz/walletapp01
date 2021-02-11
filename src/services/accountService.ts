
import { db, sql } from "../store/pg";
import { accountTypeEntity } from "../schema/types/index";


export async function getUserWalletDetails(userId: string) {
  try {
    return db
      .query(sql`SELECT * FROM wallets WHERE user_id = ${userId}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

//add user account
export async function createUserAccount(data: accountTypeEntity) {
  try {
    return db
      .query(
        sql`INSERT INTO wallets(amount, currency_id, user_id, is_main) VALUES(${data.amount}, ${data.currency_id}, ${data.user_id},${data.is_main}) RETURNING *`,
      )
      .then(([data]) => data);
  } catch (error) {
    return error.message;
  }
}

import { db, sql } from "../store/pg";
import {transactionType} from "../schema/types/index";

export async function createTransaction(data: transactionType) {
  try {
    return db
      .query(
        sql`INSERT INTO transactions(amount, currency_id, user_id, transaction_type) VALUES(${data.amount}, ${data.currency_id}, ${data.user_id}, ${data.transaction_type}) RETURNING *`,
      ).then(([data]) => data);
  } catch (error) {
    return error.message;
  }
}

export async function getUnapprovedTransactions() {
  try {
    return db
      .query(sql`SELECT * FROM transactions WHERE is_approved = false`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return -1;
  }
}


export async function getAllTransactions() {
  try {
    return db
      .query(sql`SELECT * FROM transactions`)
      .then((data) => data);
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function approveTransaction(id: string) {
  try {
    return db
      .query(sql`UPDATE transactions SET is_approved = true WHERE id = ${id} RETURNING *`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function getTransactionById(id: string) {
  try {
    return db
      .query(sql`SELECT * FROM transactions WHERE id = ${id}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return -1;
  }
}

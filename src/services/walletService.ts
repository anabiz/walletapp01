import { db, sql } from "../store/pg";

export async function getNoobWalletByUserId(userId: string) {
  try {
    return db
      .query(sql`SELECT * FROM wallets WHERE user_id = ${userId}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function getUserWalletsByUserId(userId: string) {
  try {
    return db
      .query(sql`SELECT * FROM wallets WHERE user_id = ${userId}`)
      .then((data) => data);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function deleteWalletById(walletId: string) {
  try {
    return db
      .query(sql`DELETE FROM wallets WHERE id = ${walletId}`)
      .then((data) => data);
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function updateWalletBallance(amount: number, userId: string) {
  try {
    return db
      .query(sql`UPDATE wallets SET amount = ${amount} WHERE user_id = ${userId}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function updateWalletById(amount: number, id: string) {
  try {
    return db
      .query(sql`UPDATE wallets SET amount = ${amount} WHERE id = ${id}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function getElitWalletByCurrencyId(currency_id: string, userId: string) {
  try {
    return db
      .query(sql`SELECT * FROM wallets WHERE currency_id = ${currency_id} AND user_id = ${userId}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function getAllElitWallet(userId: string) {
  try {
    return db
      .query(sql`SELECT * FROM wallets WHERE user_id = ${userId}`)
      .then((data) => data);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function getAllElitWallet1(userid: string) {
  try {
    return await db.query(
      sql`SELECT currency.name, wallets.currency_id, wallets.id, wallets.is_main, wallets.amount FROM wallets 
        JOIN currency ON wallets.currency_id = currency.id WHERE wallets.user_id = ${userid}`,
    ).then((data) => data);;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getMainWalletAndCurrencyInfo(userid: string) {
  try {
    return await db.query(
      sql`SELECT currency.name, wallets.currency_id, wallets.id, wallets.is_main, wallets.amount FROM wallets 
        JOIN currency ON wallets.currency_id = currency.id WHERE wallets.user_id = ${userid} AND wallets.is_main = true`,
    ).then(([data]) => data);;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getWalletAndCurrencyInfo(userid: string, currency: string) {
  try {
    return await db.query(
      sql`SELECT currency.name, wallets.currency_id, wallets.id, wallets.is_main, wallets.amount FROM wallets 
        JOIN currency ON wallets.currency_id = currency.id WHERE wallets.user_id = ${userid} AND currency.name = ${currency}`,
    ).then(([data]) => data);;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getUserMainWallet(userId: string) {
  try {
    return db
      .query(sql`SELECT * FROM wallets WHERE user_id = ${userId} AND is_main = true`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function updateWalletBallanceAndMainCurrency(newBallance: number, currency_id: string, walletId: string) {
  try {
    return db
      .query(
        sql`UPDATE wallets SET amount = ${newBallance} , currency_id = ${currency_id} WHERE id = ${walletId} RETURNING *`,
      )
      .then((data) => data);
  } catch (error) {
    return error.message;
  }
}

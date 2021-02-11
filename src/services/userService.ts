
import { db, sql } from "../store/pg";
import { userType } from "../schema/types/index";
//import 
import { fundAccountTypeEntity } from "../schema/types/index";
import * as transaction from "../services/transactionService";
import { getCurrencyByName } from "../services/currencyService";
import { getExchangeRate } from "../util/index"

export async function getUserByEmail(email: string) {
  try {
    return db
      .query(sql`SELECT * FROM users WHERE email = ${email}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return error;
  }
}

//add user
export async function createUser(data: userType) {
  try {
    return db
      .query(
        sql`INSERT INTO users(name, email, password, user_type) VALUES(${data.name}, ${data.email}, ${data.password},${data.user_type}) RETURNING *`,
      )
      .then(([data]) => data);
  } catch (error) {
    return error.message;
  }
}

//get user by Id
export async function getUserById(id: string) {
  try {
    return db
      .query(sql`SELECT * FROM users WHERE id = ${id}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function fundNoobAccount(creditDetail: fundAccountTypeEntity ){
  const currency_id = (await getCurrencyByName(creditDetail.main_currency)).id;
  let amount = creditDetail.amount;
  if(creditDetail.input_currency !== creditDetail.main_currency){
  amount = await getExchangeRate(creditDetail.input_currency,creditDetail.main_currency,creditDetail.amount); 
  }
  const input = {
    user_id:creditDetail.user_id,
    amount,
    currency_id,
    transaction_type: "credit"
  }
  return await transaction.createTransaction(input);
}

export async function updateUserType( userId: string, userType: string) {
  try {
    return db
      .query(sql`UPDATE users SET user_type = ${userType} WHERE id = ${userId}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return { error };
  }
}


export async function updateUserMainCurrency( userId: string, Currency_id: string) {
  try {
    return db
      .query(sql`UPDATE users SET currency_id = ${Currency_id} WHERE id = ${userId}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function cleanExceptDefaultUser(id: string) {
  try {
    return db
      .query(sql`DELETE FROM users WHERE id = ${id}`)
      .then(([data]) => data);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
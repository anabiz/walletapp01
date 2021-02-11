import bcrypt from "bcrypt";
//import { userType } from "../schema/types";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
import Request from "request-promise-native";

export const encrypt = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const getUserInfoFromToken = (token: string) => {
  const user: any = jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN_SECRET}`,
  );
  return user;
};

export const getExchangeRate = async (baseCurrency: string, targetCurrency:string, amount: number): Promise<number>=> {
  const url = `http://data.fixer.io/api/latest?access_key=${process.env.API_ACCESS_KEY}`;
  const options = {
    method: 'GET',
    uri: url
}
  const output = await Request(options).then((response) => {
    const result = JSON.parse(response) 
    const rates = result.rates;
    const newBase = amount/rates[`${baseCurrency}`];
    const rate = newBase * rates[`${targetCurrency}`];
    return rate;
}, error => {
    return error;
});
  return output;
};


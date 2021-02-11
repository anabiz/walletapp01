import { Request, Response } from "express";
import {createCurrency} from "../../services/currencyService"

const withdrawal = async(req: Request, res: Response) => {
  const d = await createCurrency(req.body.name)
  res.status(200).json({message:d})

};

export default withdrawal;
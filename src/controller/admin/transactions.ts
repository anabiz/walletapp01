import { Request, Response } from "express";
import { getAllTransactions } from "../../services/transactionService"


const transaction = async(_req: Request, res: Response) => {
  try {
    const allTransactions =await getAllTransactions();
    res.status(200).json({ data: allTransactions });
    return;
  } catch (error) {
    res.status(200).json({ message: error.message });
    return;
  }

};

export default transaction;
import { Request, Response } from "express";
import { approveTransaction, getTransactionById } from "../../services/transactionService";
import {getNoobWalletByUserId} from "../../services/walletService";
import {updateWalletBallance} from "../../services/walletService"

const fundapproval = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (id) {
      const transaction = await getTransactionById(id);
      console.log(transaction)
      if(!transaction.is_approved){
        const update = await approveTransaction(id);
        console.log(update);
        if (update.is_approved) {
            const user_id = update.user_id;
            const userWallet = await getNoobWalletByUserId(user_id);
            const newBallance = transaction.transaction_type = "credit" ? Number(userWallet.amount) + Number(update.amount) : Number(userWallet.amount) - Number(update.amount);
            console.log(newBallance);
            await updateWalletBallance(newBallance, user_id)
            res.status(200).json({ message: "approval successful" });
            return;
        }
      }else{
        res.status(400).json({ message: "transaction already approved" });
        return;
      }
      res.status(400).json({ message: "input require" });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
    return;
  }
};

export default fundapproval;
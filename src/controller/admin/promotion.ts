import { Request, Response } from "express";
import { getUserById } from "../../services/userService";
import { updateUserType } from "../../services/userService";
import { getAllElitWallet1, getMainWalletAndCurrencyInfo } from "../../services/walletService";
import { getExchangeRate } from "../../util/index";
import {updateWalletById} from "../../services/walletService";
import { deleteWalletById } from "../../services/walletService"


const promotion = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if(!user){
      throw Error;
    }
    if (user.user_type == "noob") {
      await updateUserType(user.id, "elit");
      res.status(200).json({ data: `${user.name} has been promoted to "elit"` });
      return;
    } else if (user.user_type == "elit") {
      const userMainAccount = await getMainWalletAndCurrencyInfo(userId);
      let newBalance = Number(userMainAccount.amount);
      const wallets = await getAllElitWallet1(userId);
      let count = 0
      while(count < wallets.length){
        const account = wallets[count]
        if(account.currency_id !== userMainAccount.currency_id){
            const exchange = await getExchangeRate(account.name, userMainAccount.name, account.amount);
            newBalance = newBalance + exchange;
            deleteWalletById(account.id);
        }
        ++count
      }
      await updateWalletById(newBalance, userMainAccount.id)
      await updateUserType(user.id, "noob");
      res.status(200).json({ message: "elit user demoted to noob user" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

export default promotion;
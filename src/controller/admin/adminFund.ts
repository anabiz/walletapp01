import { Request, Response } from "express";
import { validateAdminFundAcount } from "../../schema/validation/index";
import { getUserById } from "../../services/userService";
import { getExchangeRate } from "../../util/index";
import { getMainWalletAndCurrencyInfo, updateWalletById, getWalletAndCurrencyInfo } from "../../services/walletService";


const adminFund = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateAdminFundAcount(req.body);
    if (!error) {
      const userId = req.params.userId;
      const user = await getUserById(userId);
      const userMainAccount = await getMainWalletAndCurrencyInfo(userId);
      console.log(userMainAccount)
      if (user.user_type == "noob") {
        const exchange = await getExchangeRate(value.currency, userMainAccount.name, value.amount);
        const newAmount = exchange + Number(userMainAccount.amount);
        await updateWalletById(newAmount, userMainAccount.id);
        res.status(200).json({ data: `hello ${user.name} you account has been credited with ${value.amount} ` });
        return;
      } else if (user.user_type == "elit") {
        const wallet = await getWalletAndCurrencyInfo(userId, value.currency);
        if (wallet) {
          const newAmount = value.amount + Number(wallet.amount);
          await updateWalletById(newAmount, wallet.id);
          res.status(200).json({ data: `hello ${user.name} you account has been credited with ${value.amount} ` });
          return;
        } else {
          const exchange = await getExchangeRate(value.currency, userMainAccount.name, value.amount);
          const newAmount = exchange + Number(userMainAccount.amount);
          await updateWalletById(newAmount, userMainAccount.id);
          res.status(200).json({ data: `hello ${user.name} you account has been credited with ${value.amount} ` });
          return;
        }
      }
    } else {
      res.status(400).json({ message: error.message });
      return;
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

export default adminFund;
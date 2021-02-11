import { Request, Response } from "express";
import { getMainWalletAndCurrencyInfo, updateWalletBallanceAndMainCurrency } from "../../services/walletService";
import { getExchangeRate} from "../../util/index";
import {getCurrencyByName} from "../../services/currencyService";

const changeMainCurrency = async(req: Request, res: Response) => {
  try {
      const userId = req.params.id;
      const payload = req.body.newCurrency;
      const userMainAccount = await getMainWalletAndCurrencyInfo(userId);
      const newBallance = await getExchangeRate(userMainAccount.name, payload, userMainAccount.amount);
      const newCurrency = await getCurrencyByName(payload);
      await updateWalletBallanceAndMainCurrency(newBallance, newCurrency.id, userMainAccount.id)
    res.status(200).json({ data: "user main currency successfuly changed" });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }

};

export default changeMainCurrency;
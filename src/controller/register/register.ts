import { Request, Response } from "express";
import { createUser } from "../../services/userService";
import { validateUsers } from "../../schema/validation/index";
import { encrypt } from "../../util";
import { getCurrencyByName } from "../../services/currencyService";
import { accountTypeEntity } from "../../schema/types";
import { createUserAccount } from "../../services/accountService";

const register = async (req: Request, res: Response) => {
    const { error, value } = validateUsers(req.body);
    try {
        if (!error) {
            const hash = await encrypt(value.password);
            value.password = hash;
            const user = await createUser(value);
            const currency = await getCurrencyByName(value.main_currency);
            const data: accountTypeEntity = {amount:0, currency_id:currency.id, user_id:user.id, is_main:true};
            await createUserAccount(data);
            res.status(200).json({ message: user });
            return;
        }
        res.status(400).json({ message: error.message })
        return;
    } catch (error) {
        res.status(400).json({ message: error.message })
        return;
    }
};

export default register;
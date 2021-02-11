import { Request, Response } from "express";
//import { getUserById } from "../../services/userService";
import {getUserWalletsByUserId} from "../../services/walletService"

const user = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        //console.log();
        if (id) {
            console.log("jjjjjjjjj",req.user);
            //const id = req.user;
            const accounts = await getUserWalletsByUserId(id);
            res.status(200).json({ data: accounts });
            return;
        }
        res.status(400).json({ message: "incurrent input" });
        return;
    } catch (error) {
        res.status(500).json({ error: error.message });
        return;
    }

};

export default user;
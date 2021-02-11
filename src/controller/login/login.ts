import { getUserByEmail } from "../../services/userService";
import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try {
      const {email, password} = req.body
      if(email && password){
        const user: any = await getUserByEmail(email);
        if (!user) return res.status(404).send('No user found.');
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(400).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, `${process.env.SECRETE}`, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.cookie("user", token);
        return res.status(200).json({
          user: {
            created: user.created_at,
            id: user.id,
            email: user.email,
            name: user.name,
            is_admin: user.is_admin,
          },
        });
      }else{
        return res.status(400).send('invalid input.');
      }
    }catch(err){

      return res.status(500).send('something went wrong.');
        
    }  

};

export default login;
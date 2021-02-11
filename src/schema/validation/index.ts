import Joi from "joi";
import { fundAccountTypeDto, userType, adminFundAccountTypeDto } from "../types/index"

const validateUsers = (user: userType) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    main_currency: Joi.string().min(3).max(3).required(),
    user_type: Joi.string().min(4).max(4).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(user, {
    abortEarly: false,
  });
};

const validateFundAcount = (input: fundAccountTypeDto) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().min(3).max(3).required(),
    transaction_type: Joi.string().min(5).max(6)
  });
  return schema.validate(input, {
    abortEarly: false,
  });
};

const validateAdminFundAcount = (input: adminFundAccountTypeDto) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().min(3).max(3).required(),
  });
  return schema.validate(input, {
    abortEarly: false,
  });
};


export { validateUsers, validateFundAcount, validateAdminFundAcount }
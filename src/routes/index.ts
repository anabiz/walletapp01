import { Router } from "express";
import login from "../controller/login/login";
import register from "../controller/register/register";
import transaction from "../controller/admin/transactions";
import withdrawal from "../controller/withdrawal/withdrawal";
import fundaccount from "../controller/fundaccount/fundaccount";
import promotion from "../controller/admin/promotion";
import fundapproval from "../controller/admin/fundapproval";
import { loginAuth } from "../middleware/loginAuth";
import { adminAuthorization } from "../middleware/isAdmin";
import adminFund from "../controller/admin/adminFund";
import changeMainCurrency from "../controller/admin/changeMainCurrency";
import user from "../controller/user/user";

const router = Router();

/* GET home page. */
router.post("/login", login);

/* Post user registration*/
router.post("/register", register);

router.get("/user/:id", loginAuth, user);

router.get("/admin/transactions", adminAuthorization, transaction);

router.post("/withdrawal", withdrawal);

router.post("/fundaccount", loginAuth, fundaccount);

router.post("/admin/promotion/:id", adminAuthorization, promotion);

router.post("/admin/adminfund/:userId", adminAuthorization, adminFund);

router.post("/admin/fundapproval/:id",adminAuthorization, fundapproval);

router.post("/admin/changemaincurrency/:id", loginAuth, changeMainCurrency);


export default router;

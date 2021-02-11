import request from "supertest";
import app from "../app";
import {cleanExceptDefaultUser} from "../services/userService"

const req = request(app);
const user = {
  email:"test@gmail.com",
  password: "0000",
  name:"anozie",
  user_type: "elit",
  main_currency: "NGN"
}
let userId ="";
let cookie ="";

afterAll(async()=>{
  await cleanExceptDefaultUser(userId);
})
describe("Post Endpoints", () => {
  it('user can register', async () => {
    const res = await req.post("/apiv1/register")
    .send(user);
    userId = res.body.message.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
  });

  it('login user', async () => {
    const res = await req.post("/apiv1/login")
    .send({
      email:user.email,
      password: "0000"
    });
    cookie = res.header["set-cookie"][0].split("=")[1].split(" ")[0];
    cookie = cookie.slice(-cookie.length, -1);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
  });

  it('fund account by user', async () => {
    const res = await req.post("/apiv1/fundaccount")
    .send({
      amount:1000,
      currency:"NGN",
      transaction_type:"credit"
    })
    .set('Cookie', `user=${cookie};`);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
  });

  it('debit account by elit user', async () => {
    const res = await req.post("/apiv1/fundaccount")
    .send({
      amount:1000,
      currency:"NGN",
      transaction_type:"debit"
    })
    .set('Cookie', `user=${cookie};`);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
  });

  it('fund account in different currency elit by user', async () => {
    const res = await req.post("/apiv1/fundaccount")
    .send({
      amount:1000,
      currency:"USD",
      transaction_type:"credit"
    })
    .set('Cookie', `user=${cookie};`);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
  });

  it('debit account in different currency by elit user', async () => {
    const res = await req.post("/apiv1/fundaccount")
    .send({
      amount:1000,
      currency:"USD",
      transaction_type:"debit"
    })
    .set('Cookie', `user=${cookie};`);
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
  });

  it('check insufficient account ballance', async () => {
    const res = await req.post("/apiv1/fundaccount")
    .send({
      amount:90000,
      currency:"NGN",
      transaction_type:"debit"
    })
    .set('Cookie', `user=${cookie};`);
    expect(res.status).toEqual(400);
    expect(typeof res.body).toBe("object");
    expect(res.body.data).toBe("insufficient balance");
    expect(res.body).toHaveProperty("data");
  });

});

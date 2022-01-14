import { Context } from "@midwayjs/koa";
import { useContext } from "@midwayjs/hooks";
import { useEntityModel } from "@midwayjs/orm";
import { User } from "../entity/user";
import { hash } from "../utils";

export const login = async (name, password) => {
  const ctx = useContext<Context>();
  const userModel = useEntityModel(User);
  const user = await userModel.findOne({ name, password });
  if (!user) {
    throw new Error("用户名或密码错误");
  }
  const token = hash(user.id);
  ctx.cookies.set("x-token", token);
  user.token = token;
  userModel.save(user);
  return user;
};

export const getLoginUser = async () => {
  const ctx = useContext<Context>();
  const token = ctx.cookies.get("x-token");
  if (!token) return false;
  const userModel = useEntityModel(User);
  const user = await userModel.findOne({ token });
  if (!user) return false;
  return user;
};

export const logout = async () => {
  const user = await getLoginUser();
  if (!user) return true;
  user.token = "";
  const userModel = useEntityModel(User);
  userModel.save(user);

  const ctx = useContext<Context>();
  ctx.cookies.set("x-token", "");
  return true;
};

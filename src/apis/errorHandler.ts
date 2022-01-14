import { Context } from "@midwayjs/koa";
import { useContext } from "@midwayjs/hooks";

export default async (next: any) => {
  const ctx = useContext<Context>();

  try {
    await next();
  } catch (e: any) {
    ctx.response.body = {
      error: 1,
      msg: e.message,
    };
  }
};

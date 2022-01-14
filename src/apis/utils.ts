import { createHash } from "crypto";

/**
 * 生成token
 * @param uid 用户id
 * @returns
 */
export function hash(uid: number) {
  const hash = createHash("sha256");
  hash.update(Date.now().toString());
  return uid + "." + hash.digest("base64");
}

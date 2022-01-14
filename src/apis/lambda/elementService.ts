import { useEntityModel } from "@midwayjs/orm";
import { Element } from "../entity/element";

export const getElementList = async () => {
  const elementModel = useEntityModel(Element);
  return await elementModel.find();
};

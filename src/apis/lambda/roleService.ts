import { useEntityModel } from "@midwayjs/orm";
import { Role } from "../entity/role";

export const addRole = async (role: Role) => {
  const roleModel = useEntityModel(Role);
  role.id = null;
  return await roleModel.save(role);
};

export const updateRole = async (role: Role) => {
  const roleModel = useEntityModel(Role);
  return await roleModel.save(role);
};

export const removeRole = async (rid: number) => {
  const roleModel = useEntityModel(Role);
  return await roleModel.softDelete(rid);
};

export const getRoleList = async () => {
  const roleModel = useEntityModel(Role);
  return await roleModel.find();
};

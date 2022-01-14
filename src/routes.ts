import RoleList from "./pages/Admin/RoleList";
import Login from "./pages/Admin/Login";
import ElementBreak from "./pages/ElementBreak";
import Index from "./pages/Index";

export default [
  {
    key: "/",
    path: "/",
    element: Index,
    name: "首页",
  },
  {
    key: "/q",
    path: "/q",
    element: ElementBreak,
    name: "元素爆发",
  },
  {
    key: "/admin/roleList",
    path: "/admin/roleList",
    element: RoleList,
    name: "角色列表",
    hideOnLogout: true,
  },
  {
    key: "/admin/login",
    path: "/admin/login",
    element: Login,
    name: "登录",
    hideOnLogin: true,
  },
];

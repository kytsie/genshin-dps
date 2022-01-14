import React from "react";
import { Menu, notification } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import { logout } from "../apis/lambda/userService";

function TopNav() {
  const isLogin = !!sessionStorage.getItem("userInfo");
  const location = useLocation();
  const navigator = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      sessionStorage.clear();
      notification.success({
        message: "退出成功",
      });
      navigator("/admin/login");
    }
  };

  return (
    <Menu mode="horizontal" selectedKeys={[location.pathname]}>
      {routes &&
        routes
          .filter((route) =>
            isLogin ? !route.hideOnLogin : !route.hideOnLogout
          )
          .map((route) => (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          ))}
      {isLogin && (
        <Menu.Item key="logout" onClick={handleLogout}>
          退出
        </Menu.Item>
      )}
    </Menu>
  );
}

export default TopNav;

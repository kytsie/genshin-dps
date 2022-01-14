import { Button, Card, Form, Input, notification } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getLoginUser, login } from "../../../apis/lambda/userService";
import TopBar from "../../../components/TopBar";

function Login() {
  const navigator = useNavigate();

  useEffect(() => {
    getLoginUser().then((res) => {
      if (res) {
        sessionStorage.setItem("userInfo", JSON.stringify(res));
        navigator("/admin/roleList");
      }
    });
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const user = await login(values.username, values.password);
    sessionStorage.setItem("userInfo", JSON.stringify(user));
    notification.success({
      message: `欢迎回来，${user.name}`,
    });
    navigator("/admin/roleList");
  };

  const handleError = () => {
    notification.error({
      message: "输入有误",
    });
  };

  return (
    <div>
      <TopBar subTitle="管理员登录" />
      <Card style={{ maxWidth: 360, margin: "auto" }}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={handleSubmit}
          onFinishFailed={handleError}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;

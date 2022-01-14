import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider, notification } from "antd";

import "./index.css";
import App from "./App";

import { defaults, ApiParam } from "@midwayjs/hooks/request";
const request = defaults.request;
defaults.request = async (params: ApiParam) => {
  const res = await request(params);
  if (res?.error === 1) {
    notification.error({
      message: res?.msg || "请求错误",
    });
    throw new Error(res?.msg || "请求错误");
  }
  return res;
};

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

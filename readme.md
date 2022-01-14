![banner](https://uploadstatic.mihoyo.com/ys-obc/2021/12/22/4328207/4743cebcfa8b3a4cd19d98bd18177052_5936328042116858098.png)

## 说明

本项目是基于 `Midwayjs2.0` 开发的前后端一体化 Serverless 应用

用来录入一些原神角色的大招倍率和 CD，计算并给出排行
，属于自娱自乐的排行，数据全部来自米游社观测枢 Wiki 和我自己在游戏里的一些统计，一切原神数据和素材归米忽悠所有。

主要目的还是实践一下 Midwayjs 一体化开发

使用 Typescript 语言在一个项目完成整个前后端的开发还是非常爽的，唯一要吐槽的就是 Midway 的文档找起来真痛苦，写的更像是教程和特性介绍，没有覆盖整个框架的各个细节

### 项目文件修改

第一次下载下来需要改动两个文件名

数据库配置在 `/src/apis/config/config.default.ts.copy` 请去掉结尾的 `.copy`

主页面在 `index.html.copy` 请去掉结尾的 `.copy`

数据库使用了 MySQL，使用了同步功能，只需要创建一个数据库，然后启动项目的时候会自动根据 Entity 结构创建数据表的

## Midway Hooks 参考文档

Docs：[Midway Hooks - Getting Started](https://www.yuque.com/midwayjs/midway_v2/hooks_intro?translate=en)

### 命令

### 初始化项目

```bash
$ npm install
```

### 本地开发

```bash
$ npm run dev
```

### 构建

产生 `build` 和 `dist` 目录

```bash
$ npm run build
```

### 非 Serveless 服务器部署项目

需要部署到服务器的内容有

#### 服务器目录结构

```
.
├── bootstrap.js     // 启动脚本
├── build            // 前端构建结果
├── dist             // 后端构建结果
├── midway.config.ts // midway 配置文件
├── package.json
├── tsconfig.json
└── vite.config.ts
```

#### 服务器生产环境运行

```bash
$ npm install
$ npm install pm2 -g
$ NODE_ENV=production pm2 start ./bootstrap.js --name genshin-dps
```

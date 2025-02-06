# Smart-Doc VitePress 文档


[English Doc](/README.md)

## 项目目录
```shell
.
├─ .github                 # GitHub 配置
│  ├─ workfolws            # GitHub Actions
│  │  └─ deploy.yml        # GitHub Actions 发布配置
├─ docs                    # 项目根目录
│  ├─ .vitepress           # 配置目录
│  │  ├─ config            # 配置文件目录
│  │  │  ├─ en.ts          # 英文配置文件
│  │  │  ├─ index.ts       # 配置文件入口
│  │  │  ├─ shared.ts      # 主题重写配置文件
│  │  │  └─ zh.ts          # 中文配置文件
│  ├─ en                   # 英文文档                  
│  ├─ public               # 公共文件目录(只要是图片、字体等静态资源都可以放在这里)
│  ├─ zh                   # 中文文档
└─ ...
```

## 开发环境

> 推荐使用 nvm 管理 node 版本

[![nodejs](https://img.shields.io/badge/node-v20.x-brightgreen)](https://nodejs.org/en/)

> pnpm 推荐使用 scoop(windows) | brew(macos) 安装

[![pnpm](https://img.shields.io/badge/pnpm-v8.x-f9ad00)](https://yarnpkg.com/getting-started/install#nodejs-1610)


## 下载依赖

```bash
pnpm install
```
或者
```bash
pnpm i
```

## 启动开发环境
```bash
pnpm docs:dev
```

## 开始写文档
根据项目目录结构，在 `docs/zh` 或 `docs/en` 目录下创建对应的 md 文件

## 打包
```bash
pnpm docs:build
```

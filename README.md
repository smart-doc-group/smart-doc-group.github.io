# Smart-Doc VitePress Documentation


[中文文档](/README.zh-CN.md)

## Project Structure
```shell
.
├─ .github                 # GitHub configuration
│  ├─ workflows            # GitHub Actions
│  │  └─ deploy.yml        # GitHub Actions deployment configuration
├─ docs                    # Project root directory
│  ├─ .vitepress           # Configuration directory
│  │  ├─ config            # Configuration files directory
│  │  │  ├─ en.ts          # English configuration file
│  │  │  ├─ index.ts       # Configuration file entry point
│  │  │  ├─ shared.ts      # Theme override configuration file
│  │  │  └─ zh.ts          # Chinese configuration file
│  ├─ en                   # English documentation                  
│  ├─ public               # Public files directory (static resources like images, fonts, etc.)
│  ├─ zh                   # Chinese documentation
└─ ...
```

## Development Environment

> It is recommended to use nvm to manage node versions.

[![nodejs](https://img.shields.io/badge/node-v20.x-brightgreen)](https://nodejs.org/en/)

> pnpm installation is recommended via scoop (Windows) or brew (macOS).

[![pnpm](https://img.shields.io/badge/pnpm-v8.x-f9ad00)](https://yarnpkg.com/getting-started/install#nodejs-1610)

## Install Dependencies

```bash
pnpm install
```
or
```bash
pnpm i
```

## Start Development Environment
```bash
pnpm docs:dev
```

## Start Writing Documentation
Create the corresponding markdown files in the `docs/zh` or `docs/en` directories according to the project structure.

## Build
```bash
pnpm docs:build
```
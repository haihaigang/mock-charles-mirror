# Mock Charles Mirror

使用 charles mirror 保存的数据生成 mock 接口，适用于开发环境 mock 数据或调整接口

## 安装

### 直接运行

```
npx mock-charles-mirror [options]
```

#### 全局安装

```
npm install --global mock-charles-mirror
```

#### 本地安装

```
npm install mock-charles-mirror
```

## 使用

```
mock-charles-mirror [options]
```

默认会启动一个 <http://127.0.0.1:3007> 的服务，访问可查看和管理接口

### options
| 命令         | 	说明         | 默认值  |
| -------------  |-------------|-------------|
|`-p` or `--port` | 使用的端口号 |3007 |

## 前端接入使用

axios 版
```
import axios from "axios"
import { injectAxios } from "mock-charles-mirror"
injectAxios(axios, '127.0.0.1:3007')

// 如果是默认端口可省略参数
injectAxios(axios)

// 如果使用 axios.create 的实例
let http = axios.create(...)
injectAxios(http)
```

fetch 版
```
import fetch from "whatwg-fetch"
import { injectFetch } from "mock-charles-mirror"
fetch = injectFetch(fetch, '127.0.0.1:3007')

// 如果是默认端口可省略参数
fetch = injectFetch(fetch)
```

1. 启动后，前端按照上面代码示例在全局接入即可
2. 接入完成，开启使用可以在 url 参数、请求 body、页面参数里追加 `__mock__=1`

如果使用全局 fetch 的方式可以直接引入 sdk，参照 [前端如何接入使用](./docs/%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E4%BD%BF%E7%94%A8%3F.md) 里的 “接入 sdk（fetch版）”

如果使用其他方式的，参照[前端如何接入使用](./docs/%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E4%BD%BF%E7%94%A8%3F.md) 中 “请求头传参方式” 实现即可

## 管理功能

1. 新增一个域名或使用默认的 api.example.com，具体参见[如何新增一个域名](./docs/%E5%A6%82%E4%BD%95%E6%96%B0%E5%A2%9E%E4%B8%80%E4%B8%AA%E5%9F%9F%E5%90%8D.md)
2. 增加 mock 数据，具体参见[如何添加 mock 数据](./docs/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0mock%E6%95%B0%E6%8D%AE.md)
3. 使用，具体参见[前端如何接入使用](./docs/%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E4%BD%BF%E7%94%A8%3F.md)

## 开发说明

#### 命令

```
// 安装依赖
npm i
// 启动
npm start
```

本服务使用 pm2 运行，如启动失败可以通过下面命令安装 pm2（安装到全局）

```
npm i -g pm2
```

也可以直接运行入口，但是会缺失环境变量的更改

```
node ./src/index.js
```

#### 环境

```
node 14+
express 4+
```
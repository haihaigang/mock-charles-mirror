# Mock Charles Mirror

使用 charles mirror 保存的数据生成 mock 接口

## 命令

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

## 环境

```
node 14+
express 4+
```

## 如何使用

1. 新增一个域名或使用默认的 api.example.com，具体参见[如何新增一个域名](./docs/%E5%A6%82%E4%BD%95%E6%96%B0%E5%A2%9E%E4%B8%80%E4%B8%AA%E5%9F%9F%E5%90%8D.md)
2. 增加 mock 数据，具体参见[如何添加 mock 数据](./docs/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0mock%E6%95%B0%E6%8D%AE.md)
3. 使用，具体参见[前端如何接入使用](./docs/%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E6%8E%A5%E5%85%A5%E4%BD%BF%E7%94%A8%3F.md)
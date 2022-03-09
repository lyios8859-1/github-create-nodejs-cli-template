# Nodejs CLI

> 使用具有命令行的 Node.js 工具 `npx node-yun`

## 使用方式

运行命令

```sh
npx node-yun
```

# 列举所有的版本号:
```sh
npm view packabename versions 
```

# 解决报错
> GnuTLS recv error (-110): The TLS connection was non-properly terminated.

```sh
apt-get install gnutls-bin
git config --global http.sslVerify false
git config --global http.postBuffer 1048576000
```
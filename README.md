# 球球大战

这是一款多人的网页小游戏。操作简单，轻松愉快。

## 安装

项目运行需要node,npm

你可以通过以下命令安装项目所需要的package
```sh
$ npm install
```
>Tip1: 本项目依赖的两个额外package( express "4.18.2" 、 socket.io "4.6.1" )

为了测试方便，当服务器文件修改时及时重启服务器, 可以选择安装 nodemon

然后启动服务器时采用下面的指令(记得把路径切换到项目的根目录)
```sh
$ nodemon server.js
```
而不是
```sh
$ node server.js
```
## 使用

### 本地测试

启动服务器
```sh
$ nodemon server.js
```
浏览器访问 http://localhost:3000 即可进入游戏

### 局域网测试
启动服务器
```sh
$ nodemon server.js
```
修改 public\js\socketInit.js文件中下面行代码
```js
const socket = io();
```
为
```js
const socket = io('http://ip:3000');
```
ip为主机在局域网的ip地址, 端口3000为服务器的监听端口，可在server.js中修改。主机要放行TCP端口3000。

浏览器访问 http://ip:3000 即可进入游戏

### 公网运行

与局域网操作一致, ip改为公网ip即可。

## 操作

WASD/方向键操作移动, 鼠标点击 开始/停止开火。

## 补充

每过一段时间就会产生可产生特殊效果的孢子。

1. 增加血量
2. 增加移动速度
3. 增加移动子弹大小/速度
4. 增加攻速
# docker images 使用实例

## docker images 查看本地镜像
## 拉取镜像 
不加tag(版本号) 即拉取docker仓库中 该镜像的最新版本latest 加:tag 则是拉取指定版本
```
docker pull 镜像名 
docker pull 镜像名:tag 
```
## 删除没有用的镜像
```js
#删除一个
docker rmi -f 镜像名/镜像ID

#删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID

#删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID
docker rmi -f $(docker images -aq)
```

## 运行一个容器

# -it 表示 与容器进行交互式启动 -d 表示可后台运行容器 （守护式运行）  --name 给要运行的容器 起的名字  /bin/bash  交互路径
```js
docker run -it -d --name 要取的别名 镜像名:Tag /bin/bash  
```
 例如：我们启动一个mysql5.7版本的
```js
docker  run -it  -d  --name  mysql mysql:5.7 /bin/bash
```
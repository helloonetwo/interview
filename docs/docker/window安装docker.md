# window 家庭版安装docker 
## 1.新建一个txt文件并将后缀改为.cmd，里面的内容如下。
```
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

随后以管理员的身份运行上述cmd文件。如果提示要重启，则重启下


## 2.确认Hyper-V是否已经勾选，若未勾选，勾选下。该步骤可能也需重启电脑。

![](https://img.jbzj.com/file_images/article/202112/202112080909565.png)


## 3. 从官网下载并安装docker。
官网地址是这个：https://hub.docker.com/editions/community/docker-ce-desktop-windows
安装好按提示重启即可。

## 4. 处理问题 
“WSL 2 installation is incomplete.”
这说明，我使用的wsl2版本老了,需要我自己手动更新一下，按照找到的文档，我去微软官网下载最新版的wsl2。
链接地址是这个：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi


## 5. 测试docker安装是否成功
  1.拉取镜像
  ```
  docker pull hello-world
  ```
  2.运行镜像
  ```
  docker run hello-world
  ```
  如下输出则说明docker运行正常
  ![](https://img-blog.csdnimg.cn/efe42a113f12476495508815d09679d1.png)

## 6. 设置镜像加速（对于Windows 10 系统）
在系统右下角托盘 Docker 图标内右键菜单选择 Settings，打开配置窗口后左侧导航菜单选择 Daemon。在 Registrymirrors 一栏中填写加速器地址 https://docker.mirrors.ustc.edu.cn/ ，之后点击 Apply 保存后 Docker 就会重启并应用配置的镜像地址了。
![](https://img2020.cnblogs.com/blog/2395646/202105/2395646-20210515151740623-1009830589.png)

## 7. 检查加速器是否生效
检查加速器是否生效配置加速器之后，如果拉取镜像仍然十分缓慢，请手动检查加速器配置是否生效，在命令行执行 docker info，如果从结果中看到了如下内容，说明配置成功。
![](https://img2020.cnblogs.com/blog/2395646/202105/2395646-20210515153048059-334056386.png)
对于弹出的WARNING警告：
WARNING: No blkio throttle.read_bps_device support
WARNING: No blkio throttle.write_bps_device support
WARNING: No blkio throttle.read_iops_device support
WARNING: No blkio throttle.write_iops_device support
新手可以暂时忽略，具体详解可以参考：https://phpor.net/blog/post/4009
# Python

[参考](https://www.liujiangblog.com/course/python/)

----

## 零碎

### 异常处理

可以通过 `raise Exception('异常类')` 抛出异常

```python
try:
    pass
except:
    pass
except IndexError as err:
    print(err)
else:
    print("else")
finally:
    print("finally")
```

### 模块

- 函数 类 文件(模块) 包
- 导入
  - `import x.xx.xxx`
  - `from x.xx import xxx [as rename]`
- 包形式
  - 含`__init__.py` 为入口

## 数据类型

## 流程控制

## 函数

## 文件

## 面向对象

## 异常处理


## 标准库

- os 系统|文件|命令
- sys Python解释器相关
- subprocess 创建子进程
- random `random.random()` [0,1)浮点
- bisect 二分查找和插入算法
- hashlib 哈希算法
- queue 消息队列
  - 管道|栈|优先级队列
  - `.qsize()` 当前个数
  - `.empty()` `.full()` 空/满否
  - `.put()` `.get()` 出入
  - `.join()` 阻塞
- fileinput 文件遍历
- shutil shell工具
- zipfile 解/压缩
- tarfile 解/打包
- getpass 隐藏密码字符
- json
  - `.dump(obj,fp)` `.load(fp)` json文件互转
  - `.dumps(obj)` `.loads(s)` json字符串互转
- pickle Python专用持久化模块 用法同json
- shelve 字典形式对象持久化 `.open()` `.close()`
- time 时间
  - `.sleep(t)` 暂停
  - `.time()` `.mktime(t)` 时间戳
  - `.gmtime` `.localtime()` 结构化
  - `.ctime()` `.asctime()` 格式化
  - `.clock()` CPU时间
- datetime 日期
  - `.date` `.time` `.datetime`
  - `timedelta` `tzinfo` `timezone`
- timeit 执行时间统计
- logging 日志
- re 正则
  - `.compile(pattern)` 创建具体匹配规则re对象
  - `.match(pattern, string)` 匹配
  - `.search(pattern, string)` 查找
  - `.split(pattern, string)` 根据匹配处分割
  - `.findall(pattern, string)` 列出全部
  - `.sub(pattern, repl,string)` 替换


## 网络编程

:::: code-group
::: code-group-item TCP服务端(多线程)
```python
import socket
import threading        # 导入线程模块


def link_handler(link, client):
    print("服务器开始接收来自[%s:%s]的请求...." %(client[0], client[1]))
    while True:     # 利用一个死循环，保持和客户端的通信状态
        client_data = link.recv(1024).decode()
        if client_data == "exit":
            print("结束与[%s:%s]的通信..." % (client[0], client[1]))
            break
        print("来自[%s:%s]的客户端向你发来信息：%s" % (client[0], client[1], client_data))
        link.sendall('服务器已经收到你的信息'.encode())
    link.close()


ip_port = ('127.0.0.1', 9999)
sk = socket.socket()            # 创建套接字
sk.bind(ip_port)                # 绑定服务地址
sk.listen(5)                    # 监听连接请求

print('启动socket服务，等待客户端连接...')

while True:     # 一个死循环，不断的接受客户端发来的连接请求
    conn, address = sk.accept()  # 等待连接，此处自动阻塞
    # 每当有新的连接过来，自动创建一个新的线程，
    # 并将连接对象和访问者的ip信息作为参数传递给线程的执行函数
    t = threading.Thread(target=link_handler, args=(conn, address))
    t.start()
```
:::
::: code-group-item TCP客户端
```python
import socket

ip_port = ('127.0.0.1', 9999)

s = socket.socket()     # 创建套接字

s.connect(ip_port)      # 连接服务器

while True:     # 通过一个死循环不断接收用户输入，并发送给服务器
    inp = input("请输入要发送的信息： ").strip()
    if not inp:     # 防止输入空信息，导致异常退出
        continue
    s.sendall(inp.encode())

    if inp == "exit":   # 如果输入的是‘exit’，表示断开连接
        print("结束通信！")
        break

    server_reply = s.recv(1024).decode()
    print(server_reply)

s.close()       # 关闭连接
```
:::
::: UDP
```python
# 服务端
import socket
ip_port = ('127.0.0.1', 9999)
sk = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, 0)
sk.bind(ip_port)

while True:
    data = sk.recv(1024).strip().decode()
    print(data)
    if data == "exit":
        print("客户端主动断开连接！")
        break

sk.close()

# 客户端
import socket
ip_port = ('127.0.0.1', 9999)

sk = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, 0)
while True:
    inp = input('发送的消息：').strip()
    sk.sendto(inp.encode(), ip_port)
    if inp == 'exit':
        break

sk.close()
```
:::
::: Socket Server
```python
import socketserver

class MyServer(socketserver.BaseRequestHandler):
    def handle(self):
        conn = self.request         # request里封装了所有请求的数据
        conn.sendall('欢迎访问socketserver服务器！'.encode())
        while True:
            data = conn.recv(1024).decode()
            if data == "exit":
                print("断开与%s的连接！" % (self.client_address,))
                break
            print("来自%s的客户端向你发来信息：%s" % (self.client_address, data))
            conn.sendall(('已收到你的消息<%s>' % data).encode())

if __name__ == '__main__':
    # 创建一个多线程TCP服务器
    server = socketserver.ThreadingTCPServer(('127.0.0.1', 9999), MyServer)
    print("启动socketserver服务器！")
    # 启动服务器，服务器将一直保持运行状态
    server.serve_forever()
```
:::
::::




## 线程进程

### 多线程

- `threading.Thread(self, group=None, target=None, name=None,args=(), kwargs=None, *, daemon=None)`
  - `.start()` 启动线程 等调度
  - `.run()` 调度后执行的方法
  - `.join([timeout])` 调用该方法将会使主调线程堵塞，直到被调用线程运行结束或超时

:::: code-group
::: code-group-item 继承Thread类
```python
import threading

class MyThread(threading.Thread):
    def __init__(self, thread_name):
        super(MyThread, self).__init__(name=thread_name)
    def run(self):
        print("%s正在运行中......" % self.name)

if __name__ == '__main__':    
    for i in range(10):
        MyThread("thread-" + str(i)).start()
```
:::
::: code-group-item 实例化对象
```python
import threading
import time

def show(arg):
    time.sleep(1)
    print('thread '+str(arg)+" running....")

if __name__ == '__main__':
    for i in range(10):
        t = threading.Thread(target=show, args=(i,))
        t.start()
```
:::
::::

### 生产和消费

```python
import time
import queue
import threading

q = queue.Queue(10)

def productor(i):
    # 厨师不停地每2秒做一个包子
    while True:
        q.put("厨师 %s 做的包子！" % i)
        time.sleep(2)

def consumer(j):
    # 顾客不停地每秒吃一个包子
    while True:
        print("顾客 %s 吃了一个 %s"%(j,q.get()))
        time.sleep(1)

# 实例化了3个生产者（厨师）
for i in range(3):
    t = threading.Thread(target=productor, args=(i,))
    t.start()
# 实例化了10个消费者（顾客）
for j in range(10):
    v = threading.Thread(target=consumer, args=(j,))
    v.start()
```

### 线程池

```python
import queue
import time
import threading


class MyThreadPool:
    def __init__(self, maxsize=5):
        self.maxsize = maxsize
        self._pool = queue.Queue(maxsize)   # 使用queue队列，创建一个线程池
        for _ in range(maxsize):
            self._pool.put(threading.Thread)

    def get_thread(self):
        return self._pool.get()

    def add_thread(self):
        self._pool.put(threading.Thread)


def run(i, pool):
    print('执行任务', i)
    time.sleep(1)
    pool.add_thread()   # 执行完毕后，再向线程池中添加一个线程类


if __name__ == '__main__':

    pool = MyThreadPool(5)  # 设定线程池中最多只能有5个线程类

    for i in range(20):
        t = pool.get_thread()   # 每个t都是一个线程类
        obj = t(target=run, args=(i, pool)) # 这里的obj才是正真的线程对象
        obj.start()

    print("活动的子线程数： ", threading.active_count()-1)
```

## 多进程

- `multiprocessing.Proces`用法和`threading.Thread`类 类似
- 进程间数据共享可以使用`multiprocess`模块提供的`Queues` `Array` `Manager`


```python
import os
import multiprocessing

def foo(i):
    # 同样的参数传递方法
    print("这里是 ", multiprocessing.current_process().name)
    print('模块名称:', __name__)
    print('父进程 id:', os.getppid())  # 获取父进程id
    print('当前子进程 id:', os.getpid())  # 获取自己的进程id
    print('------------------------')

if __name__ == '__main__':

    for i in range(5):
        p = multiprocessing.Process(target=foo, args=(i,))
        p.start()
```

## 协程异步

对于IO密集型的任务,我们可以使用协程来处理,协程相比多线程的一大优势就是省去了多线程之间的切换开销，获得了更高的运行效率.为了利用多核CPU性能,可以采用多进程+协程的方法.

```python
import asyncio
import datetime

async def display_date(num, loop):      # 注意这一行的写法
    end_time = loop.time() + 10.0
    while True:
        print("Loop: {} Time: {}".format(num, datetime.datetime.now()))
        if (loop.time() + 1.0) >= end_time:
            break
        await asyncio.sleep(2)  # 阻塞直到协程sleep(2)返回结果

loop = asyncio.get_event_loop()  # 获取一个event_loop
tasks = [display_date(1, loop), display_date(2, loop)]
loop.run_until_complete(asyncio.gather(*tasks))  # "阻塞"直到所有的tasks完成
loop.close()
```
# Python基础

[参考](https://www.liujiangblog.com/course/python/)

----

## 运算符

- 算数运算符
  - `加+ 减- 乘* 除/ 取模% 幂** 取整除//`
  - `divmod(10,3)=>(3,1)`
  - decimal模块解决精度问题
- 比较运算符
  - `== != <> < > >= <=`
  - `3>2>1 等于 (3>2) and (2>1)`
- 赋值运算符
  - `= += -= *= /= %= **= //=`
- 逻辑运算符
  - `and or not`
- 位运算符
  - `& | ^ ~ << >>`
- 成员运算符
  - `in`
  - `not in` 没找到返回true
- 身份运算符
  - `is`用于判断两个变量的引用是否为同一个对象，而==用于判断变量引用的对象的值是否相等
  - `is not`
  - `id()` 查看某个变量或者对象的内存地址
- 三目运算符
  - `1 if 5>3 else 0`

## 数据类型

### 数字类型

- 分类
  - 整数 小整数对象池[-5,256]
  - 浮点数 1.23 1.2e5
  - 复数`a+bj` `complex(a,b)`
- 方法
  - int(x) 转化为整数
  - float(x) 转化为浮点
- math库
  - 静态方法
    - abs(x) fabs(x)
    - ceil(x) floor(x)
    - exp(x) log(x[,y]) log10(x)
    - modf(x) round(x [,n])
    - max(x1,x2) min(x1,x2)
    - pow(x, y) sqrt(x)
    - 三角函数略
  - 属性
    - pi e

### 布尔类型

- 可以用`bool()`测试布尔值
- 可以就看成1和0

### 列表list

- 删除
  - `del list[0]`
  - `list.remove("b")`
  - `list.pop()`
- 运算符操作
  - `[1, 2, 3] + [4, 5, 6]`
  - `['Hi!'] * 4`
  - `3 in [1, 2, 3]`
- 对列表的内置函数
  - `len(arr)`
  - `max(arr)`
  - `min(arr)`
  - `list((1, "a", "b", 2))`将序列转换为列表
- 切片`list[start:end:step]`
- 实例方法
  - `.append(obj)` 添加新对象
  - `.count(obj)` 统计元素次数
  - `.extend(seq)` 追加多值
  - `.index(obj)` 找索引
  - `.insert(index,obj)` 插入对象*
  - `.pop(obj=list[-1])` 移除元素
  - `.remove(obj)` 移除第一个匹配项*
  - `.reverse()` 反转
  - `.sort([func])` 排序
  - `.copy()` 复制列表
  - `.clear()` 清空(del arr[:])
- python的列表特别适合也很方便作为一个堆栈来使用
- 通常我们使用queue.Queue作为单向队列，使用collections.deque作为双向队列

### 元组

- 和数组相同的
  - 使用方括号下标访问元素
  - 切片
  - `.count() .index()`
  - `len() max() min() tuple()`
- 不同于数组
  - 不能增删改元素
  - 没有`remove() append() pop()`
- 只保证一级子元素不可变,但嵌套元素可以变

### 字符串

- 运算符操作
  - a+b a*2
  - str[:]
  - in / not in
  - r/R 原始字符串
- 转义字符
  - \ 续行符
  - `\\ \' \"`
  - `\a \b \e \000 \n \v \t \r \f \oyy \xyy \033`
- 实例方法
  - `.capitalize()` 
  - `.center(width)`
  - `.count(str,beg=0,end=len(string))`
  - `bytes.decode(encoding='UTF-8',errors='strict')`
  - `.encode(encoding='UTF-8',error='strict')`
  - `.endswith(obj,beg=0,end=len(string))` `.startswith(同)`
  - `.expandtabs(tabsize=8)`
  - `.find(str, beg=0, end=len(string))`
  - `.format()`
  - `.index(str, beg=0, end=len(string))` `.rindex(同)`
  - `.isalnum()`
  - `.isalpha()` `.isupper()`
  - `.isdecimal()` `.isspace()` `.istitle()`
  - `.isdigit()` `.islower()` `.isnumeric()`
  - `.join(seq)`
  - `.ljust(width)` `.rjust(width)`
  - `.lower()`
  - `.lstrip()` `.rstrip()` `.strip([obj])`
  - `.maketrans(intab, outtab)`
  - `.max(str) .min(str)`
  - `.partition(str)` `.rpartition(str)`
  - `.replace(str1, str2, num=string.count(str1))`
  - `.rfind(str, beg=0,end=len(string))`
  - `.splitlines([keepends])    `
  - `.split(str="", num=string.count(str))`
  - `.swapcase()` `.title()` `.upper()`
  - `.translate(str, del="")`
  - `.zfill(width)`
  - 编解码 查找 替换 分割 大小写 去除两端 检验开头结尾
- `.format()` 格式化方法
  - 参数和用法非常多,详见文档
  - 位置参数和关键字参数填值
  - 字符串颜色控制
  - 用字符填充长度
- Python3在运行时全部使用Unicode编码
  - 操作系统运行时，在内存中，统一使用的都是Unicode编码，当需要将数据保存到硬盘或者网络传输的时候，就转换为UTF-8编码，进行保存和传输
  - 用文本编辑器的时候，从文件系统或者说硬盘上读取的UTF-8编码字符被转换为Unicode字符到内存里，供程序或者操作系统使用。编辑完成后，保存的时候再把Unicode转换为UTF-8保存到文件
  - 浏览网页的时候，服务器会把动态生成的Unicode内容转换为UTF-8传输到客户的浏览器

### 字典

- 字典是有序(但不能下标) 不定长 可变  散列
- `d = {key1 : value1, key2 : value2 }`
- `dict()` 构造函数
  - `dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])`
  - `dict(sape=4139, guido=4127, jack=4098)`
- 几种删除删除
  - `del dic['Name']`
  - `dic.pop('name')`
  - `dic.clear()`
  - `del dic`
- 实例方法
  - `.clear()`
  - `.copy()` 浅复制
  - `fromkeys()`
  - `.get(key)`
  - `.items()`
  - `.keys()`
  - `.values()`
  - `.pop(key)`
  - `.popitem()`
  - `.setdefault(key, default=None)`
  - `.update(dict2)`
- 遍历 `for key in dic`

### bytes

- 创建
  - b=b'string'
  - b=bytes('string',encoding='utf-8')
- 用法同字符串(不会用可以先转成字符串再转回来)

### 集合set

- 增删改查
  - `s = set([1,1,2,3,3,4])` 构造函数
  - `set("it is a nice day")`
  - `s.add(5)` `s.remove(5)` `s.pop()`
  - `s.update("hello")`
- &交 |并 -差

## 流程控制

:::: code-group
::: code-group-item 顺序执行
```python
def func():
    print('hello world') #3

class theEnd:
    def __init__(self):
        print('the beginning') #1

    def __del__(self):
        print('the end') #4

if __name__ == '__main__':
    go = theEnd()
    print('ok') #2
    func()
```
:::
::: code-group-item 条件判断-if
```python
if is_1 :
    pass
elif is_2 :
    pass
else:
    pass
```
:::
::: code-group-item 循环控制-for
```python
for x in [1,2,3]:
    pass
    break/continue
```
:::
::: code-group-item 循环控制-while
```python
while boolean:
    pass
else:
    pass
```
:::
::::

## 函数

```python
a, arr = 1, [1, 2, 3]

def wrong():
  return a+=1 #只能修改内部变量

def pid(a, arr):
    print(a, id(a))
    print(arr, id(arr))
    return id(a), id(arr)

def func(a, arr):
    a_1, arr_1 = pid(a, arr)
    a += 1
    arr.append(4)
    a_2, arr_2 = pid(a, arr)
    return a_1 == a_2, arr_1 == arr_2

print(pid(a, arr))
print(func(a, arr))
```

### 参数类型

- 位置参数
  - `def func(x,y):`
  - 按顺序不多不少
- 默认参数
  - `def pow(x,n=2):`
  - 写在位置参数后
  - 参数名传参(可缺省)
  - 默认值应当为不可变对象
- 动态参数
  - `def func(*args, **kwargs)`
  - 元组和键值对
  - *args必须在**kwargs之前
  - `func(*[1,2])` -> `func(1,2)`
  - `func(**{'k1':'v1'})` -> `func(k1='v1')`
- 关键字参数
  - `def student(name, age, *, id):`
  - 按参数名传递

### 变量作用域

- Local –> Enclosing –> Global –>Built-in
- global / nonlocal 指定当前变量使用全局/外层变量
- 函数作用域取决于代码块位置而非调用时机

```python
name = 'n'

def f1():
    name = 'n1'

    def f2():
        return name
    return f2()

def f3():
    name = 'n3'
    return f4

def f4():
    return name

print(f1())
print(f3()())
```

### 递归

```py
def move(n, fm, to):
    if (n == 1):
        return print(fm, "->", to)
    move(n-1, a, b)  # 前n-1个盘从a到b
    move(1, a, c)  # 最大盘a到c
    move(n-1, b, c)  # b到c

a, b, c = 'a', 'b', 'c'
move(3, a, c)  # 把三个盘从a送到c
```

### 匿名函数 推导式

- 匿名函数
  - `f = lambda x: x * x`
- 推导式
  - 列表
    - `[x * x for x in range(1, 11) if x % 2 == 0]`
    - `[a + b for a in ‘123' for b in ‘abc']`
    - `[lambda x: x + i for i in range(10)]`
  - 字典
    - `{x: x**2 for x in (2, 4, 6)}`
  - 集合
    - `{x for x in 'abracadabra' if x not in 'abc'}`

### 迭代器 生成器

- 迭代器
  - 是否可迭代 `isinstance('abc', Iterable)`
  - `it = iter([1,2,3])` `next(it)`
- 生成器
  - `g = (x * x for x in range(1, 4))` `next(g)`
  - 使用`yield`返回的函数
    - `next(g)` `for i in g:`
    - 每次遇到返回yield的值
    - 下次从之前位置继续运行

### 装饰器

:::: code-group
::: code-group-item 基础
```python
def decorator(func):
    def repl(*args,**kwargs):
        print("认证成功！")
        result = func(*args,**kwargs)
        print("日志添加成功")
        return result
    return repl

# 此处会直接运行函数,因此需要再加一层函数
@decorator  
def f1(name):
    print(name)
    return 'ok'

print(f1('gzz'))
```
:::
::: code-group-item 进阶
```python
def decorator1(func):
    def repl(*args, **kwargs):
        print("认证成功！")
        result = func(*args, **kwargs)  # 运行时跳到下个装饰器
        print("日志添加成功")
        return result
    return repl

def decorator2(data):
    def main(func):
        def repl(name):
            print("欢迎,今天是", data)
            result = func(name)
            print("又见面了")
            return result
        return repl
    return main

@decorator1
@decorator2('20221222')
def f1(name):
    print(name)
    return '任务完成'

print(f1('gzz'))
```
:::
::::

## 内置函数

|               |              |              |                |                |            |
| ------------- | ------------ | ------------ | -------------- | -------------- | ---------- |
| abs()         | 绝对值       | frozenset()  | 不变集合对象   | open()         | 打开文件   |
| all()         | 迭代里都真   | getattr()    | 获取属性       | ord()          | 字符转数字 |
| any()         | 迭代里有真   | globals()    | 全局变量       | pow()          | 幂         |
| ascii()       | `__repr__`   | hasattr()    | 有无属性       | print()        | 打印       |
| bin()         | 转二进制     | hash()       | 生成哈希值     | property()     | 伪装属性   |
| bool()        | 转布尔类型   | help()       | 对象帮助文档   | range()        | 范围       |
| bytearray()   | 转该类型     | hex()        | 转十六进制     | repr()         | `__repr__` |
| bytes()       | 转字节类型   | id()         | 内存地址       | reversed()     | 逆序       |
| callable()    | 是否可调用   | input()      | 接收输入       | round()        | 四舍五入   |
| chr()         | 数字转字符   | int()        | 转整数         | set()          | 转set      |
| classmethod() | 类方法       | isinstance() | 是否是类的实例 | setattr()      | 设置属性   |
| compile()     | 字符串转代码 | issubclass() | 是否子类       | slice()        | 切片       |
| complex()     | 生成复数对象 | iter()       | 创建迭代器     | sorted()       | 排序       |
| delattr()     | 删除属性     | len()        | 对象长度       | staticmethod() | 静态方法   |
| dict()        | 转字典       | list()       | 转list         | str()          | 转字符串   |
| dir()         | 列出成员     | locals()     | 局部变量       | sum()          | 求和       |
| divmod()      | 除商和余数   | map()        | 映射           | super()        | 调用父类   |
| enumerate()   | 枚举         | max()        | 最大值         | tuple()        | 转tuple    |
| eval()        | 执行并返回   | memoryview() | 内存视图       | type()         | 数据类型   |
| exec()        | 执行字符串   | min()        | 最小值         | vars()         | 打印对象   |
| filter()      | 过滤         | next()       | `__next__()`   | zip()          | 逐一配对   |
| float()       | 转浮点       | object()     | 返回基类       | `__import__()` | 导入包     |
| format()      | `__format__` | oct()        | 转八进制       |                |            |


## 零碎

### 输入输出

- `i=input('please input:')` 要对输入进行检验 有时可以用于阻塞暂停程序
- `print(self, *args, sep=' ', end='\n', file=None)`函数定义
  - 格式化输出`print ("我叫 %s 今年 %d 岁!" % ('小明', 10))`
  - `print(f"my name is {name}")`


### 文件

- `open(filename, mode)`
  - r w a x b w+ a+ r+
- 方法
  - `.read()` `.write()`
  - `for _ in f: print(t)`
  - `.close()`
- with 执行完自动关闭
  - `with open('log1') as obj1, open('log2','w') as obj2:`

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


# TypeScript

[参考](https://ts.yayujs.com/)

----

## 类型注释

- 原始类型
  - `function login(name: string): number {return id}`
- 对象类型
  - `user: {name: string, id:number, isBoy?: boolean}`
- 联合类型
  - `id: number | string`
- 类型别名
  - `type user={name: string,id: number}`
  - `type id = number | string`
  - 通过交集扩展类型
    - `type bear = Animal&{honey: boolean}`
- 接口
  - `interface user={name: string,id: number}`
  - 通过继承扩展类型
    - `interface Bear extends Animal {honey: boolean}`
  - 重复添加字段
    - `interface User{name: string}`
    - `interface User{id: number}`
- 断言(一次只能扩大和缩小范围)
  - `const gzz = new Person('gzz') as Student`
  - `const gzz = <Student>new Person('gzz')` not in .tsx
  - `const num = ('str' as any) as number` 指鹿为马
- 字面量类型
  - `function func(alignment: 'left' | 'right'){}`
  - 字面量推断 略
- null undefined
  - strictNullChecks 关闭时可以被赋值给任意类型的属性
  - strictNullChecks 开启时要先进行类型收窄
  - 非空断言操作符 `obj!.prop` 明确不是才使用


## 装饰器
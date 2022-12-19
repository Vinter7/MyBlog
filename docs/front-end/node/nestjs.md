# NestJS

[文档](https://nestjs.com/)

----

## 快速上手

1. `npm i -g @nestjs/cli`
2. `nest new project-name`
3. `npm run start:dev`

**创建模块**

1. `nest g module girl`
2. `nest g controller girl --no-spec`
3. `nest g service girl --no-spec`


:::: code-group
::: code-group-item app.module.ts
```ts
import { Module } from '@nestjs/common';
import { GirlModule } from './girl/girl.module';

@Module({
  imports: [GirlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
:::
::: code-group-item girl.module.ts
```ts
import { Module } from '@nestjs/common';
import { GirlController } from './girl/girl.controller';
import { GirlService } from './girl/girl.service';

@Module({
  controllers: [GirlController],
  providers: [GirlService],
})
export class GirlModule {}
```
:::
::: code-group-item girl.controller.ts
```ts
import { Controller, Get } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
  constructor(private girlService:GirlService){}
  @Get()
  getGirls():any{
    return this.girlService.getGirls()
  }
}
```
:::
::: code-group-item girl.service.ts
```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class GirlService {
  getGirls(){
    return {
      code:0,
      data:['翠花','小红','大丫'],
      msg:'请求成功'
    }
  }
}
```
:::
::::

## Get & Post

:::: code-group
::: code-group-item GET
```ts
import { Request, Query } from '@nestjs/common'
@Get('/getGirlById')
getGirlById(@Request() req){
  let id:number = parseInt(req.query.id) 
  return this.girlService.getGirlById(id)
}

// 同上
@Get('/getGirlById')
getGirlById(@Query() query){
  let id:number = parseInt(query.id) 
  return this.girlService.getGirlById(id)
}
```
:::
::: code-group-item POST
```ts
import { Body } from '@nestjs/common'
@Post('/addGirl')
addGirl(@Body() body){
  console.log(body)
  return this.girlService.addGirl(body)
}
```
:::
::::

## 动态路由


```ts
import { Param, Headers } from '@nestjs/common'
@Get('/findGirlById/:id/:name')
findGirlById(@Param() params ,@Headers() header):any{
  console.log(params.name)
  console.log(header)
  let id:number = parseInt(params.id) 
  return this.girlService.getGirlById(id)
}
```

## TypeORM

`npm install --save @nestjs/typeorm typeorm mysql2`


```ts
// girl.module.ts
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ TypeOrmModule.forRoot({
    type:'mysql',           // 数据库类型
    host:'localhost',       // 数据库的连接地址host
    port:3306,              // 数据库的端口 3306
    username:'root',        // 连接账号
    password:'root123',     // 连接密码
    database:'test_db',     // 连接的表名
    retryDelay:500,         // 重试连接数据库间隔
    retryAttempts:10,       // 允许重连次数
  })],
  controllers: [GirlController],
  providers: [GirlService],
})
```


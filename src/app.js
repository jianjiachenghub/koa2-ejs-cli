const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

// 导入配置的路由信息
const index = require('./routes/index')
const users = require('./routes/users')
const sessionTest = require('./routes/sessionTest')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const error = require('./routes/error')



let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

// 监听错误,可配置错误显示的页面 通过redirect重定向
// 原理是 重写koa源码里的app.context.onerror函数，加上个性化配置
onerror(app,{redirect: '/error'})

// middlewares 解析数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// 把json字符串转变为js的对象
app.use(json())

// 日志 打印一些请求的信息
app.use(logger())

// 挂载目录为静态资源
app.use(require('koa-static')(__dirname + '/public'))

// 注册后端编译模版渲染路径
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = ['qwerasd123456']
app.use(session({
    key: 'sessionId', // cookie name 默认是 `koa.sid`
    prefix: 'sessionRedisKey:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000  // 单位 ms
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// 日志 手写的打印信息的功能
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 真正挂载路由到app上 test
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(sessionTest.routes(), sessionTest.allowedMethods())
// 业务逻辑
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
// error最后挂载，前面都不匹配就进入404路由
app.use(error.routes(), error.allowedMethods())
app.use((ctx,next)=>{
  console.log('111');
   var result =  next();
  console.log(result);//Promise { <pending> }
  console.log('222');
});
app.use(async(ctx,next)=>{
  console.log('333');
  next();
  let testVar = await  promiseFn();
  console.log('444');
});

function promiseFn(){
  return new Promise(function(resovle,reject){
      setTimeout(function(){
          resovle('5');
      },500)
  });
}

// 监听错误，显示到后台
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

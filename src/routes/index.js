const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  //这里的index其实就指向的是前面views下面的index
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


router.get('/testError', async (ctx, next) => {
  throw new Error('我抛出了一个错误用于测试')
})

module.exports = router

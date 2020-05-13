const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  await ctx.render('error', {
    message: '不知道哪里出错了',
  })
})

router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
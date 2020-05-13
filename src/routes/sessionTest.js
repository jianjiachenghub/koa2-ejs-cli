const router = require('koa-router')()

router.get('/loginTest', async (ctx, next) => {
  const session = ctx.session
  if(session.login == null){
    session.login = {
        login:'yes',
        views:1,
    }
  }else{
    session.login.views++ 
  }
  ctx.body = `已经登录${session.login.views}次`
})

router.get('/out', async (ctx, next) => {
    const session = ctx.session
    session.login = null
    ctx.body = '已退出'
  })
  

module.exports = router
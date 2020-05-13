const request = require('supertest')
// 执行app里面的callback函数 返回一个(res,req)=>{}的函数 相当于是请求的一个回调函数
const callback = require('../../app').callback()
console.log(callback)
// 在传入request进行处理 这样我们可以直接请求路由 并获取res
const server = request(callback)
console.log(callback)


test('测试Demo 应该成功', async () => {
    const res = await server
        .get('/json')
    expect(res.body).toEqual({
        title:'koa2 json'
    })
})

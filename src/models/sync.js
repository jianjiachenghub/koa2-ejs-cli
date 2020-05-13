const Sequelize = require("sequelize");
const BlogsModel = require('./blogs')
const UsersModel = require('./users')

const conf = {
  host: "localhost",
  dialect: "mysql"
};

const seq = new Sequelize("sequelize_test", "root", "jjc958978", conf);
const Blogs = BlogsModel(seq)
const Users = UsersModel(seq)


//测试连接
seq
  .authenticate()
  .then(() => {
    console.log("ok");
  })
  .catch(() => {
    console.log("err");
  });

/*
// 标准同步
// 只有当数据库中不存在与模型同名的数据表时，才会同步
sequelize.sync()
// 动态同步
// 修改同名数据表结构，以适用模型。
sequelize.sync({alter: true})
// 强制同步
// 删除同名数据表后同步，谨慎使用，会导致数据丢失
sequelize.sync({force: true})

// 另外，当你指定表与表之间的关联后，修改被关联的表结构时会抛出异常。
// 需要先注释掉关联代码，然后更新同步模型后，再取消掉注释即可。

// 再另外，当你有新的关联时必须使用动态同步才会生效。

*/
seq.sync().then(() => {
  console.log("sync ok");
  process.exit();
});

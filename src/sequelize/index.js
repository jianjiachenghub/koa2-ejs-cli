const Sequelize = require("sequelize");

const conf = {
  host: "localhost",
  dialect: "mysql",
};

const seq = new Sequelize("sequelize", "root", "jjc958978", conf);

seq
  .authenticate()
  .then((res) => {
    console.log("yes", res);
  })
  .catch((err) => {
    console.log("no", err);
  });

const User = seq.define("user", {});
const Class = seq.define(
  "class",
  {
    class_name: {
      type: Sequelize.STRING, //varchar(255)
      allowNull: false
    },
  },
  {
    // 不要忘记启用时间戳！
    timestamps: false,

    // 不想要 createdAt
    createdAt: false,

    // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    updatedAt: false,
  }
);

(async function () {
  console.log("开始查询");
  const usersData = await User.findAll({
    attributes: ["name", "age"],
  });
  console.log(
    "Users",
    usersData.map((user) => user.dataValues)
  );

  console.log("开始插入");

  const classesData = await Class.create({
    class_name: "英语",
  });
  console.log(
    "classes",
    classesData.map((classes) => classes.dataValues)
  );
})();

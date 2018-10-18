require("express-async-errors");
let express = require("express");
let morgan = require("morgan");
require("./db");
let user_routes = require("./routes/user_routes");
let category_routes = require("./routes/category_routes");
let app = new express();
let config = require("./config/index");
//中间件来定义res的扩展函数
app.use(require("./middle_ware/res_middle"));
app.use(morgan("combined"));
app.use(express.json());
//定义路由级别的中间件
app.use("/user", user_routes);
app.use("/category", category_routes);
app.get("/", (req, res) => {
    res.send("测试服务器已搭建好");
});

app.use((err, req, res, next) => {
    res.fail(err.toString());
});
app.listen(config.PORT);

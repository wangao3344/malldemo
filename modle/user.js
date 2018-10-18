let mongoose = require("mongoose");
let Schema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "用户名必须填写"]
    },
    password: {
        type: String,
        require: [true, "密码必须填写"]

    },
    age: {
        type: Number,
        min: [18, "最小年龄不能低于18岁"],
        max: [120, "最大年龄不能超过120岁"]
    },
    role: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model("malldemo", Schema);
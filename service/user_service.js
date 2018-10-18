let Schema = require("../modle/user");
let config = require("../config/index");
let encryptUtil = require("../utils/encryptUtil");

//注册用户
async function regist(user) {
    //先查询是否存在
    let result = await Schema.findOne({username: user.username});
    if (result) {
        throw Error(`用户名:${user.username}已经存在`);
    }
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    user.role = 0;
    result = await Schema.create(user);
    user.password = "";
    console.log("添加成功");
    return result;
}

//登录
async function login(user) {
    let result = await isExsitUser(user.username);
    console.log(result.password);
    if (user.password.trim().length == 0 || user.password == null) {
        throw Error("请输入密码(不能都是空格)")
    }
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    console.log(user.password);
    if (user.password === result.password) {
        console.log("登录成功");

    } else {
        throw Error("登录失败");
    }
    user.password = "";
    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    }
    let encode = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);
    console.log(encode)
    return encode;

}

//修改密码
async function updateUser(user, password) {
    let finduser = await isExsitUser(user.username);

    console.log(finduser.password);
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    console.log((user.password));
    password = encryptUtil.md5Hmac(password, user.username);
    console.log(password);
    if (password === user.password) {
        throw Error("修改的密码不能相同");
    }

    if (user.password === finduser.password) {
        user.role = 0;
        let result = await Schema.update({username: user.username}, {password: password})
        if (result.n !== 1) {
            throw Error("密码修改失败");
        }
        console.log("修改密码成功");
    } else {
        throw Error("密码输入有误")
    }

}

//查询用户是否存在
async function isExsitUser(username) {
    let result = await Schema.findOne({username: username});
    if (!result) {
        throw Error(`用户名${username}不存在`);
    }
    return result;

}

//查询用户
async function findUserByUsername(username) {
    let result = await Schema.findOne({username: username});
    console.log(result)
    if (result) {
        result.password = "";
        //res.success(result);
    } else {
        throw Error("查询失败");
    }

    return result;

}

async function deleteUser(user) {
    let result = await isExsitUser(user.username);
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    if (user.password === result.password) {
        result = await Schema.deleteOne({username: user.username});
        if (result.n !== 1) {
            throw Error("删除数据失败")
        }
        console.log("删除数据成功");
    }
}

module.exports = {
    regist,
    login,
    updateUser,
    deleteUser,
    findUserByUsername
}

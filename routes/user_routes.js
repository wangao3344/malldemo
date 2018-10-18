let express = require("express");
let router = express.Router();
let utils = require("../utils/encryptUtil");
let service = require("../service/user_service");
//注册
router.post("/regist", async (req, res) => {
    let body = req.body;
    console.log(body);
    res.success(await service.regist(body));
});
//登录
router.post("/login", async (req, res) => {
    let result = await service.login(req.body);
    res.success(result);

});
//查找用户
router.get("/:username", async (req, res) => {
    let username = req.params.username;
    console.log(username);
    let result = await service.findUserByUsername(username);
    res.success(result);
});
//删除用户
router.delete("/", async (req, res) => {
    let user = req.body;
    await service.deleteUser(user);
    res.success();
})
module.exports = router;
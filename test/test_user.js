require("../db");
let user_service = require("../service/user_service");

async function testService() {
    let user = {
        username: "xiaosan",
        password: "6234567"
    }
    await user_service.regist(user);
    //await user_service.updateUser(user,"234567");
    //await user_service.login(user);
    //await user_service.deleteUser(user);
}

testService();

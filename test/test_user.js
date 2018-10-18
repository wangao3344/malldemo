require("../db");
let user_service = require("../service/user_service");
let category_service = require("../service/category_service");
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

async function testCategoryService() {
    let category = {
        name: "居家"
    }
    // category_service.addCategory(category)
    //category_service.deleteCategory("5bc83fa66eea9e0ad0b59d47");
    //await category_service.updateCategory("5bc84781ba73e32e3406b3e1",category)
    await category_service.findCategoryByPage(1);
}

testCategoryService();

//testService();

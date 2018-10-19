let dev = require("./dev");
let pro = require("./pro");
let config = process.env.NODE_ENV;
if (config === "production") {
    config = pro;
} else {
    config = dev;
}
module.exports = config;
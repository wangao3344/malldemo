let dev = require("./dev");
let pro = require("./pro");
let config = process.env.NODEPATH;
if (config) {
    config = pro;
} else {
    config = dev;
}
module.exports = config;
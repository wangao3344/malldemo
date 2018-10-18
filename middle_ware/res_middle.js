module.exports = (req, res, next) => {
    res.success = (result) => {
        res.send({
            code: 6,
            msg: "操作成功",
            data: result
        })
    };
    res.fail = (err) => {
        res.send({
            code: 4,
            msg: "操作失败",
            data: err.toString()
        })
    }
    next();
}

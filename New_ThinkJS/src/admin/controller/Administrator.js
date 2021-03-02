const Base = require('./base.js');
module.exports = class extends Base {

    // 查询管理员列表
    async adlistAction() {
        let model = think.model("admin");
        let adlist = await model.where("isDel=0").order("adminID desc").select();
        if (think.isEmpty(adlist)) {
            adlist = [];
            return this.fail(-1, "无法获取数据");
        }
        return this.success(adlist, "success");
    }

    // 查找管理员ID
    async findbyadminIDAction() {

        let model = think.model("admin");// 实例化article的orm
        let whereObj = { "adminID": this.get("adminID") };
        // model.where("article_uuid='9b22720f-9cb3-420a-b15c-e198994c2882'").find();
        let showRes = await model.where(whereObj).find();
        if (!think.isEmpty(showRes)) {
            return this.success(showRes, "获取成功！！")
        }
        return this.fail(-100, "获取失败！！")
    }

    // 添加管理员
    async addapiAction() {

        let obj = this.post();
        if (obj.adminName.length <= 0) {
            return this.fail(-101, "管理员账号不能为空！");
        }
        if (obj.adminName.length < 5) {
            return this.fail(-102, "管理员账号不能少于5个字符！");
        }
        if (obj.adminPasswd.length <= 0) {
            return this.fail(-103, "管理员密码不能为空！");
        }
        if (obj.adminPasswd.length < 6) {
            return this.fail(-104, "管理员密码不能少于6个字符！");
        }
        let model = think.model("admin");
        obj.adminPasswd = think.md5(obj.adminPasswd + ":123456");
        obj.adminPasswd = think.md5(obj.adminPasswd + ":123456");
        let result = await model.thenAdd(obj, { "adminName": obj.adminName });
        if (!think.isEmpty(result)) {
            if (result.type == "exist") {
                return this.fail(-101, "账号已存在！");
            }
            return this.success(result, "操作成功！");

        } else {
            return this.fail(-100, "操作失败！");
        }
    }


    // 编辑管理员
    async updapiAction() {

        let model = think.model("admin");
        // 修改操作
        let updObj = this.post(); //接收提交参数
        if (updObj.adminName.length <= 0) {
            return this.fail(-101, "管理员账号不能为空！");
        }
        if (updObj.adminName.length < 5) {
            return this.fail(-102, "管理员账号不能少于5个字符！");
        }
        if (updObj.adminPasswd.length <= 0) {
            return this.fail(-103, "管理员密码不能为空！");
        }
        if (updObj.adminPasswd.length < 6) {
            return this.fail(-104, "管理员密码不能少于6个字符！");
        }
        updObj.adminPasswd = think.md5(updObj.adminPasswd + ":123456");
        updObj.adminPasswd = think.md5(updObj.adminPasswd + ":123456");
        let res = await model.where(`adminID='${updObj.adminID}'`).update(updObj);
        if (!think.isEmpty(res)) {
            if (res.type == "exist") {
                return this.fail(-101, "账号已存在！");
            }
            return this.success(res, "操作成功！");

        } else {
            return this.fail(-100, "操作失败！");
        }
    }

    // 删除新闻
    async dodelAction() {
        // 1.接收参数
        let uuid = this.get("adminID");
        // 2.实例化模型
        let model = think.model("admin");
        // 3.修改操作
        let delObj = { isDel: 1 }; // IS_DELETED=1 即是删除(软删除)
        let res = await model.where(`adminID='${uuid}'`).update(delObj);
        if (!think.isEmpty(res)) {
            // return this.success({res},"删除成功"); err//errno : 0
            return this.json({ errno: 0, data: { res }, msg: "删除成功!" });
        } else {
            // return this.fail(1001,"删除失败");
            return this.json({ errno: 1001, msg: "删除失败!" });
        }
    }


}
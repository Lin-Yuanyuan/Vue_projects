const Base = require('./base.js');
module.exports = class extends Base {

    // 查询会员列表
    async userlistAction() {
        let model = think.model("user");
        let uslist = await model.where("isDel=0").order("userID desc").select();
        if (think.isEmpty(uslist)) {
            uslist = [];
            return this.fail(-1, "无法获取数据");
        }
        return this.success(uslist, "success");
    }

    // 查找会员ID
    async findbyuserIDAction() {

        let model = think.model("user");// 实例化article的orm
        let whereObj = { "userID": this.get("userID") };
        // model.where("article_uuid='9b22720f-9cb3-420a-b15c-e198994c2882'").find();
        let showRes = await model.where(whereObj).find();
        if (!think.isEmpty(showRes)) {
            return this.success(showRes, "获取成功！！")
        }
        return this.fail(-100, "获取失败！！")
    }

    // 添加会员
    async addapiAction() {

        let obj = this.post();
        if (obj.userName.length <= 0) {
            return this.fail(-101, "会员账号不能为空！");
        } if (obj.userName.length < 5) {
            return this.fail(-102, "会员账号不能少于5个字符！");
        }
        if (obj.userPassword.length <= 0) {
            return this.fail(-103, "会员密码不能为空！");
        }
        if (obj.userPassword.length < 6) {
            return this.fail(-104, "会员密码不能少于6个字符！");
        }
        let model = think.model("user");
        obj.userPassword = think.md5(obj.userPassword + ":123456");
        obj.userPassword = think.md5(obj.userPassword + ":123456");
        let result = await model.thenAdd(obj, { "userName": obj.userName });
        if (!think.isEmpty(result)) {
            if (result.type == "exist") {
                return this.fail(-103, "账号已存在！");
            }
            return this.success(result, "操作成功！");

        } else {
            return this.fail(-104, "操作失败！");
        }
    }


    // 编辑管理员
    async updapiAction() {

        let model = think.model("user");
        // 修改操作
        let updObj = this.post(); //接收提交参数
        if (updObj.userName.length <= 0) {
            return this.fail(-101, "会员账号不能为空！");
        } if (updObj.userName.length < 5) {
            return this.fail(-102, "会员账号不能少于5个字符！");
        }
        if (updObj.userPassword.length <= 0) {
            return this.fail(-103, "会员密码不能为空！");
        }
        if (updObj.userPassword.length < 6) {
            return this.fail(-104, "会员密码不能少于6个字符！");
        }
        updObj.userPassword = think.md5(updObj.userPassword + ":123456");
        updObj.userPassword = think.md5(updObj.userPassword + ":123456");
        let res = await model.where(`userID='${updObj.userID}'`).update(updObj);
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
        let uuid = this.get("userID");
        // 2.实例化模型
        let model = think.model("user");
        // 3.修改操作
        let delObj = { isDel: 1 }; // IS_DELETED=1 即是删除(软删除)
        let res = await model.where(`userID='${uuid}'`).update(delObj);
        if (!think.isEmpty(res)) {
            // return this.success({res},"删除成功"); err//errno : 0
            return this.json({ errno: 0, data: { res }, msg: "删除成功!" });
        } else {
            // return this.fail(1001,"删除失败");
            return this.json({ errno: 1001, msg: "删除失败!" });
        }
    }


}
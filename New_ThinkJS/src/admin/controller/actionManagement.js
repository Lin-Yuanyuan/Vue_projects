const Base = require('./base.js');
module.exports = class extends Base {

    // 查询点赞列表
    async actlistAction() {
        let model = think.model("action");
        let actlist = await model.where("isDel=0").order("actionID desc").select();
        if (think.isEmpty(actlist)) {
            actlist = [];
            return this.fail(-1, "无法获取数据");
        }
        return this.success(actlist, "success");
    }

    // 查找点赞ID
    async findbyactionIDAction() {

        let model = think.model("action");// 实例化article的orm
        let whereObj = { "actionID": this.get("actionID") };
        // model.where("article_uuid='9b22720f-9cb3-420a-b15c-e198994c2882'").find();
        let showRes = await model.where(whereObj).find();
        if (!think.isEmpty(showRes)) {
            return this.success(showRes, "获取成功！！")
        }
        return this.fail(-100, "获取失败！！")
    }

    // 添加点赞
    async addapiAction() {

        let obj = this.post();
        if (obj.actionnewsID.length <= 0) {
            return this.fail(-101, "点赞新闻编号不能为空！");
        }
        if (obj.actionuserID.length <= 0) {
            return this.fail(-102, "会员编号不能为空！");
        }
        if (obj.actionuserName.length <= 0) {
            return this.fail(-103, "会员账号不能为空！");
        }
        if (obj.actionuserName.length < 5) {
            return this.fail(-103, "会员账号不能少于5个字符！");
        }
        let model = think.model("action");
        let result = await model.add(obj);

        let newsmodel = think.model("news");
        let uuid = obj.actionnewsID;
        let sqlStr = `update news set action = action +1 where newsID=${uuid}`
        let res = await newsmodel.query(sqlStr);
        console.log("res:", res);

        if (!think.isEmpty(result)) {
            if (result.type == "exist") {
                return this.fail(-104, "已存在！");
            }
            return this.success(result, "操作成功！");

        } else {
            return this.fail(-105, "操作失败！");
        }
    }


    // 编辑点赞
    async updapiAction() {

        let model = think.model("action");
        // 修改操作
        let updObj = this.post(); //接收提交参数
        if (updObj.actionnewsID.length <= 0) {
            return this.fail(-101, "点赞新闻编号不能为空！");
        }
        if (updObj.actionuserID.length <= 0) {
            return this.fail(-102, "会员编号不能为空！");
        }
        if (updObj.actionuserName.length <= 0) {
            return this.fail(-103, "会员账号不能为空！");
        }
        if (updObj.actionuserName.length < 5) {
            return this.fail(-103, "会员账号不能少于5个字符！");
        }
        let res = await model.where(`actionID='${updObj.actionID}'`).update(updObj);
        if (!think.isEmpty(res)) {
            if (res.type == "exist") {
                return this.fail(-100, "已存在！");
            }
            return this.success(res, "操作成功！");

        } else {
            return this.fail(-101, "操作失败！");
        }
    }

    // 删除点赞
    async dodelAction() {
        // 1.接收参数
        let uuid = this.get("actionID");
        // 2.实例化模型
        let model = think.model("action");
        // 3.修改操作
        let delObj = { isDel: 1 }; // IS_DELETED=1 即是删除(软删除)
        let res = await model.where(`actionID='${uuid}'`).update(delObj);
        if (!think.isEmpty(res)) {
            // return this.success({res},"删除成功"); err//errno : 0
            return this.json({ errno: 0, data: { res }, msg: "删除成功!" });
        } else {
            // return this.fail(1001,"删除失败");
            return this.json({ errno: 1001, msg: "删除失败!" });
        }
    }


}
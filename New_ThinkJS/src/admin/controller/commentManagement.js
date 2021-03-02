const Base = require('./base.js');
module.exports = class extends Base {

    // 查询评论列表
    async comlistAction() {
        let model = think.model("comment");
        let comlist = await model.where("isDel=0").order("commentID desc").select();
        if (think.isEmpty(comlist)) {
            comlist = [];
            return this.fail(-1, "无法获取数据");
        }
        return this.success(comlist, "success");
    }

    // 查找评论ID
    async findbycomIDAction() {

        let model = think.model("comment");// 实例化article的orm
        let whereObj = { "commentID": this.get("commentID") };
        // model.where("article_uuid='9b22720f-9cb3-420a-b15c-e198994c2882'").find();
        let showRes = await model.where(whereObj).find();
        if (!think.isEmpty(showRes)) {
            return this.success(showRes, "获取成功！！")
        }
        return this.fail(-100, "获取失败！！")
    }

    // 添加评论
    async addapiAction() {
        let obj = this.post();
        // console.log("obj:",obj);
        if (obj.commentNewsID.length <= 0) {
            return this.fail(-101, "新闻编号不能为空！");
        }
        if (obj.commentUserID.length <= 0) {
            return this.fail(-102, "会员编号不能为空！");
        }
        if (obj.commentUserName.length <= 0) {
            return this.fail(-103, "会员账号不能为空！");
        }
        if (obj.commentUserName.length < 5) {
            return this.fail(-104, "会员账号不能少于5个字符！");
        }
        if (obj.commentNewsTitle.length <= 0) {
            return this.fail(-105, "新闻标题不能为空！");
        }
        if (obj.commentContent.length <= 0) {
            return this.fail(-106, "评论内容不能为空！");
        }
        let model = think.model("comment");
        let result = await model.add(obj);
        
        let newsmodel = think.model("news");
        let uuid = obj.commentNewsID;
        let sqlStr = `update news set comment = comment +1 where newsID=${uuid}`
        let res = await newsmodel.query(sqlStr);

        // console.log("result:",result);
        // console.log("res:",res);
        
        if (!think.isEmpty(result)) {
            return this.success(result, "添加成功！");
        } else {
            return this.fail(-100, "添加失败！");
        }
    }



    // 编辑评论
    async updapiAction() {

        let model = think.model("comment");
        // 修改操作
        let updObj = this.post(); //接收提交参数
        if (updObj.commentNewsID.length <= 0) {
            return this.fail(-101, "新闻编号不能为空！");
        }
        if (updObj.commentUserID.length <= 0) {
            return this.fail(-102, "会员编号不能为空！");
        }
        if (updObj.commentUserName.length <= 0) {
            return this.fail(-103, "会员账号不能为空！");
        }
        if (updObj.commentUserName.length < 5) {
            return this.fail(-104, "会员账号不能少于5个字符！");
        }
        if (updObj.commentNewsTitle.length <= 0) {
            return this.fail(-105, "新闻标题不能为空！");
        }
        if (updObj.commentContent.length <= 0) {
            return this.fail(-106, "评论内容不能为空！");
        }
        let res = await model.where(`commentID='${updObj.commentID}'`).update(updObj);
        if (!think.isEmpty(res)) {
            return this.success(res, "编辑成功！");
        } else {
            return this.fail(-100, "编辑失败！");
        }
    }

    // 删除评论
    async dodelAction() {
        // 1.接收参数
        let uuid = this.get("commentID");
        // 2.实例化模型
        let model = think.model("comment");
        // 3.修改操作
        let delObj = { isDel: 1 }; // IS_DELETED=1 即是删除(软删除)
        let res = await model.where(`commentID='${uuid}'`).update(delObj);
        if (!think.isEmpty(res)) {
            // return this.success({res},"删除成功"); err//errno : 0
            return this.json({ errno: 0, data: { res }, msg: "删除成功!" });
        } else {
            // return this.fail(1001,"删除失败");
            return this.json({ errno: 1001, msg: "删除失败!" });
        }
    }


}
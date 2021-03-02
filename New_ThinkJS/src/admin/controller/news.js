const Base = require('./base.js');
module.exports = class extends Base {

    // 查询新闻列表
    async newlistAction() {
        let model = think.model("news");
        let newlist = await model.where("isDel=0").order("newsID desc").select();
        if (think.isEmpty(newlist)) {
            newlist = [];
            return this.fail(-1, "无法获取数据");
        }
        return this.success(newlist, "success");
    }

    // 添加新闻
    async addapiAction() {
        try {
            // throw new Exception("....");
            let obj = this.post();
            // obj.ARTICLE_UUID = think.uuid();
            if (obj.newsTitle.length <= 0) {
                return this.fail(-101, "新闻标题不能为空！");
            }
            if (obj.category.length <= 0) {
                return this.fail(-102, "新闻栏目不能为空！");
            }
            if (obj.newsDesc.length <= 0) {
                return this.fail(-103, "新闻描述不能为空！");
            }
            if (obj.publisher.length <= 0) {
                return this.fail(-104, "发布者不能为空！");
            }
            if (obj.newsContent.length <= 0) {
                return this.fail(-105, "新闻内容不能为空！");
            }
            if (obj.newsImagePath.length <= 0) {
                return this.fail(-105, "封面图片不能为空！");
            }
            let model = think.model("news");// 实例化article的orm
            // model._pk = "ARTICLE_UUID";
            let res = await model.add(obj); //add 结果是返回新增数据的主键id
            return this.success(res, "操作成功！");
        } catch (error) {
            return this.fail(-1, "操作失败！");
        }
    }

    // 删除新闻
    async dodelAction() {
        // 1.接收参数
        let uuid = this.get("newsID");
        // 2.实例化模型
        let model = think.model("news");
        // 3.修改操作
        let delObj = { isDel: 1 }; // IS_DELETED=1 即是删除(软删除)
        let res = await model.where(`newsID='${uuid}'`).update(delObj);
        // this.ctx.type = "html";
        // if (!think.isEmpty(res)) {
        //   return this.ctx.body = `<h1>操作成功！</h1>
        //   <script> setTimeout(function(){ location.href='/admin/article/index' },3000); </script>`;
        // } else {
        //   return this.ctx.body = `<h1>操作失败！</h1>
        //   <script> setTimeout(function(){ history.go(-1) },3000); </script>`;
        // }
        if (!think.isEmpty(res)) {
            // return this.success({res},"删除成功"); err//errno : 0
            return this.json({ errno: 0, data: { res }, msg: "删除成功!" });
        } else {
            // return this.fail(1001,"删除失败");
            return this.json({ errno: 1001, msg: "删除失败!" });
        }
    }

    // 查找新闻ID
    async findbynewsIDAction() {

        let model = think.model("news");// 实例化article的orm
        let whereObj = { "newsID": this.get("newsID") };
        // model.where("article_uuid='9b22720f-9cb3-420a-b15c-e198994c2882'").find();
        let showRes = await model.where(whereObj).find();
        if (!think.isEmpty(showRes)) {
            return this.success(showRes, "获取成功！！")
        }
        return this.fail(-100, "获取失败！！")
    }

    // 修改新闻
    async updapiAction() {

        let model = think.model("news");
        // 修改操作
        let updObj = this.post(); //接收提交参数
        if (updObj.newsTitle.length <= 0) {
            return this.fail(-101, "新闻标题不能为空！");
        }
        if (updObj.category.length <= 0) {
            return this.fail(-102, "新闻栏目不能为空！");
        }
        if (updObj.newsDesc.length <= 0) {
            return this.fail(-103, "新闻描述不能为空！");
        }
        if (updObj.publisher.length <= 0) {
            return this.fail(-104, "发布者不能为空！");
        }
        if (updObj.newsContent.length <= 0) {
            return this.fail(-105, "新闻内容不能为空！");
        }
        if (updObj.newsImagePath.length <= 0) {
            return this.fail(-105, "封面图片不能为空！");
        }
        let res = await model.where(`newsID='${updObj.newsID}'`).update(updObj);
        if (!think.isEmpty(res)) {
            return this.success(res, "操作成功");
        } else {
            return this.fail(-1005, "操作失败");
        }
    }

    // 关键字远程搜索
    async categorylistAction() {
        let keyword = this.get("keyword");
        let model = think.model("category");
        let map = [];
        map['categoryName'] = new Array('like', '%' + keyword + '%');
        let searchlist = await model.where(map).select();
        if (think.isEmpty(searchlist)) {
            return this.fail(-1, "无法获取数据");
        }
        return this.success(searchlist, "success");
    }

    // admin 评论数
    // async adcommentCouAction() {
    //     let keyword = this.get("keyword");

    // }

}
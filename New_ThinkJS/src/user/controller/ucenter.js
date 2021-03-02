const ThinkCacheFile = require('think-cache-file');
const svgCaptcha = require('svg-captcha');
const Base = require('./base.js');
module.exports = class extends Base {


    // 注册操作
    async doregAction() {
        let fromObj = this.post();
        if (fromObj.reuserpasswd != fromObj.userPassword) {
            return this.fail(-102, "两次输入的密码不一致！");
        }
        if (fromObj.userPassword.length < 5) {
            return this.fail(-103, "密码长度不足6位");
        }
        if (fromObj.vercode != this.session.captcha) {
            return this.fail(-105, "验证码错误！");
        }
        delete fromObj.reuserpasswd;
        let model = think.model("user");
        fromObj.userPassword = think.md5(fromObj.userPassword + ":123456");
        fromObj.userPassword = think.md5(fromObj.userPassword + ":123456");
        let result = await model.thenAdd(fromObj, { "userName": fromObj.userName });
        if (!think.isEmpty(result)) {
            if (result.type == "exist") {
                return this.fail(-101, "账号已存在！");
            }
            return this.success(result, "注册成功！");

        } else {
            return this.fail(-100, "注册失败！");
        }
    }


    // 产生验证码图片
    codeAction() {
        var captcha = svgCaptcha.createMathExpr({
            size: 4,
            ignoreChars: "0o1i",
            width: 70,
            height: 40
        })
        this.session.captcha = captcha.text;
        this.ctx.type = "svg";
        this.ctx.body = captcha.data;
    }

    //登录操作
    async dologinAction() {
        var logininfo = this.post();
        if (logininfo.vercode != this.session.captcha) {
            return this.fail(-105, "验证码错误！");
        }
        delete logininfo.vercode;
        // console.log("登录发送的信息：", logininfo);
        let user_model = this.model("user");
        logininfo.userPassword = think.md5(logininfo.userPassword + ":123456");
        logininfo.userPassword = think.md5(logininfo.userPassword + ":123456");
        let res = await user_model.where(logininfo).find();

        if (!think.isEmpty(res)) {
            await this.session("userID", res.userID);
            await this.session("userName", res.userName);
            return this.success(res, "登录成功！");
        } else {
            return this.fail(-100, "账号或密码错误！");
        }

    }

    async getsessAction() {
        //获取session: 如果session信息存在
        const usID = await this.session("userID");
        const usName = await this.session("userName");
        if (think.isEmpty(usID) || think.isEmpty(usName)) {
            return this.fail(-100, "未登录");
        } else {
            return this.success({ usID, usName }, "已登录");
        }
    }

    // 退出
    async dologoutAction() {
        await this.session("userID", null);
        await this.session("userName", null);
    }

    // 添加点赞记录
    async addLikeAction() {
        try {
            let obj = {
                actionnewsID: this.get('newsID'),// 获取提交的参数
                actionuserID: this.get('userID'),
                actionuserName: this.get('userName'),
                actionCount: this.get('actionCount'),
            }
            // console.log("参数对象：", obj);
            let model = think.model("action");
            let res = await model.add(obj);

            let uuid = obj.actionnewsID;
            let newsmodel = think.model("news");
            let sqlStr = `update news set action = action +1 where newsID=${uuid}`
            let reStr = await newsmodel.query(sqlStr);

            // 查询 - 点赞数
            // let uuid = this.get("newsID");

            // let sql1 = `select count(*) as actionNum from action where actionnewsID=${uuid} `
            // let res1 = await model.query(sql1);
            // console.log("res1:", res1);

            // var arr = [];
            // for (var a in res1) {
            //   arr.push(res1[a].actionNum)
            //   console.log("arr", arr);
            // };

            // // update-set 到 admin - 点赞数
            // let newsmodel = think.model("news");
            // let sql2 = `update news set action = ${arr} where newsID = ${uuid}`
            // // console.log("sql2", sql2);
            // let res2 = await newsmodel.query(sql2);
            // // console.log("res：", res);

            if (!think.isEmpty(res)) {
                return this.success(res, "操作成功");
            } else {
                return this.fail(-1005, "操作失败");
            }



        } catch (error) {
            return this.fail(-1, "操作失败！");
        }
    }


    // 删除点赞记录
    async delikeAction() {
        let newsID = this.get("newsID");
        let userID = this.get("userID");
        let model = think.model("action");
        let res = await model.where(`actionnewsID=${newsID}`, `actionuserID=${userID}`).find();
        let deres = await model.where(res).delete();

        let newsmodel = think.model("news");
        let sqlStr = `update news set action = action-1 where newsID=${newsID}`
        let reStr = await newsmodel.query(sqlStr);


        if (think.isEmpty(deres)) {
            return this.fail(-1, "无法获取数据");
        }
        return this.success(deres, "success");
    }
}


const ThinkCacheFile = require('think-cache-file');
const sessctrl = require('./sessctrl.js');
const svgCaptcha = require('svg-captcha');
const Base = require('./base.js');
module.exports = class extends Base {


    // 注册操作
    async doregAction() {
        let fromObj = this.post();
        if (fromObj.ReadminPasswd != fromObj.adminPasswd) {
            return this.fail(-102, "两次输入的密码不一致！");
        }
        if (fromObj.adminPasswd.length < 5) {
            return this.fail(-103, "密码长度不足6位");
        }
        if (fromObj.vercode != this.session.captcha) {
            return this.fail(-105, "验证码错误！");
        }
        delete fromObj.ReadminPasswd;
        let model = think.model("admin");
        fromObj.adminPasswd = think.md5(fromObj.adminPasswd + ":123456");
        fromObj.adminPasswd = think.md5(fromObj.adminPasswd + ":123456");
        let result = await model.thenAdd(fromObj, { "adminName": fromObj.adminName });
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
        let user_model = this.model("admin");
        logininfo.adminPasswd = think.md5(logininfo.adminPasswd + ":123456");
        logininfo.adminPasswd = think.md5(logininfo.adminPasswd + ":123456");
        let res = await user_model.where(logininfo).find();

        if (!think.isEmpty(res)) {
            await this.session("adminID", res.adminID);
            await this.session("adminName", res.adminName);
            return this.success(res, "登录成功！");
        } else {
            return this.fail(-100, "账号或密码错误！");
        }
    }

    async getsessAction() {
        //获取session: 如果session信息存在
        const adID = await this.session("adminID");
        const adName = await this.session("adminName");
        if (think.isEmpty(adID) || think.isEmpty(adName)) {
            return this.fail(-100, "未登录");
        } else {
            return this.success({ adID, adName }, "已登录");
        }
    }



    // 退出
    async dologoutAction() {
        await this.session("adminID",null);
        await this.session("adminName",null);
    }

}
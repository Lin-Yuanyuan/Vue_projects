const fs = require('fs');
const path = require('path');
const Base = require('./base.js');
module.exports = class extends Base {

    douploadAction() {
        const imageFile = this.file('_file'); // 类似 this.get()、this.post()
        // console.log("文件参数信息:",imageFile);
        if (think.isEmpty(imageFile)) {
            return this.fail('保存失败');
        }
        //优化1： upload目录是否存在，不存在则创建；
        let destDir = "upload"; // 文件需要存放的目录
        let saveDir = think.ROOT_PATH + "/www/static/" + destDir + "/"; //拼接路径
        // console.log("项目的存放的绝对路径：", think.ROOT_PATH);
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir);
        }
        //优化2： 在upload目录底下创建日期格式的目录；
        let dateDir = think.datetime(new Date(), "YYYY-MM-DD");
        saveDir = think.ROOT_PATH + "/www/static/" + destDir + "/" + dateDir + "/"; //拼接路径
        if (!fs.existsSync(saveDir)) {
            fs.mkdirSync(saveDir);
        }
        //优化3： 如何动态获取文件扩展名；
        let extname = path.extname(imageFile.path);
        // console.log("扩展名：", extname);

        //优化4： 限制文件类型；
        let limitExt = [".jpg",".jpeg",".png", ".gif"]; //只有这些文件允许上传
        if (limitExt.indexOf(extname) == -1) {
            return this.fail(-1001, '保存失败,上传文件为非图片！');
        }
        // 上传的文件将保存在www/static/upload, 并使用uuid进行重命名
        const filename = '/static/' + destDir + '/' + dateDir + '/' + think.uuid(32) + extname;
        // 文件流操作
        const is = fs.createReadStream(imageFile.path); // 读取流
        // console.log("上传文件的临时路径：",imageFile.path);
        const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename); //写入流
        // console.log("上传文件的目标路径：",think.ROOT_PATH + '/www' + filename);
        is.pipe(os); //管道：将临时文件拷贝到目标文件中
        is.on("end", function () {
            // 监听：当拷贝(文件流操作)结束后，删除临时文件
            fs.unlink(imageFile.path, () => { });
        })
        // return this.success({
        //     name: '_file',
        //     fileUrl: filename
        // },"文件上传成功！");

        // 为响应 富文本编辑器图片上传功能，把接口修改如下
        return this.success([filename], "文件上传成功！");
    }

}
module.exports = class extends think.Controller {
  __before() {
    console.log("获取客户端域名：", this.header("origin"));
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "*");
    this.header("Access-Control-Allow-Methods", "*");
    this.header('Access-Control-Allow-Credentials', true);
  }
};

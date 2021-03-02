const Base = require('./base.js');

module.exports = class extends Base {

  indexAction() {
    return this.display();

  }

  // 轮播图 - 文化
  async bannerlistAction() {
    let model = think.model("news");
    let bannerlist = await model.where({ isDel: "0", category: "文化" }).order("newsID asc").limit(5).select();
    if (think.isEmpty(bannerlist)) {
      bannerlist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(bannerlist, "success");
  }

  // 商业
  async conentlistAction() {
    let model = think.model("news");
    let conentlist = await model.where({ isDel: "0", category: "商业" }).order("newsID asc").select();
    if (think.isEmpty(conentlist)) {
      conentlist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(conentlist, "success");
  }

  // 查询子详情页面
  async windowlistAction() {
    let uuid = this.get("newsID");
    // console.log("newsID参数：", uuid);
    let model = think.model("news");
    let windowlist = await model.where(`newsID='${uuid}'`).select();
    if (think.isEmpty(windowlist)) {
      windowlist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(windowlist, "success");
  }

  // 添加评论
  async addcommentAction() {
    let obj = this.get();
    // console.log("参数对象：", obj);
    let model = think.model("comment");
    let data = await model.add(obj);

    let newsmodel = think.model("news");
    let uuid = obj.commentNewsID;
    let sqlStr = `update news set comment = comment +1 where newsID=${uuid}`
    let res = await newsmodel.query(sqlStr);


    if (think.isEmpty(data)) {
      data = [];

      return this.fail(-1, "无法获取数据");
    }
    return this.success(data, "success");

  }

  // 查询评论
  async commentlistAction() {
    let uuid = this.get("commentNewsID");
    let model = think.model("comment");
    let commentlist = await model.where(`commentNewsID='${uuid}'`).order("commentDate desc").select();
    if (think.isEmpty(commentlist)) {
      return this.fail(-1, "无法获取数据");
    }
    return this.success(commentlist, "success");
  }

  // 智能
  async intelistAction() {
    let model = think.model("news");
    let intelist = await model.where({ isDel: "0", category: "智能" }).order("newsID asc").select();
    if (think.isEmpty(intelist)) {
      intelist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(intelist, "success");
  }

  // 设计
  async deslistAction() {
    let model = think.model("news");
    let deslist = await model.where({ isDel: "0", category: "设计" }).order("newsID asc").select();
    if (think.isEmpty(deslist)) {
      deslist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(deslist, "success");
  }

  // 时尚
  async fashlistAction() {
    let model = think.model("news");
    let fashlist = await model.where({ isDel: "0", category: "时尚" }).order("newsID asc").select();
    if (think.isEmpty(fashlist)) {
      fashlist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(fashlist, "success");
  }

  // 娱乐
  async enterlistAction() {
    let model = think.model("news");
    let enterlist = await model.where({ isDel: "0", category: "娱乐" }).order("newsID asc").select();
    if (think.isEmpty(enterlist)) {
      enterlist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(enterlist, "success");
  }


  // 文化
  async cultlistAction() {
    let model = think.model("news");
    let cultlist = await model.where({ isDel: "0", category: "文化" }).order("newsID asc").limit(5, 30).select();
    if (think.isEmpty(cultlist)) {
      cultlist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(cultlist, "success");
  }

  // 游戏
  async gamelistAction() {
    let model = think.model("news");
    let gamelist = await model.where({ isDel: "0", category: "游戏" }).order("newsID asc").select();
    if (think.isEmpty(gamelist)) {
      gamelist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(gamelist, "success");
  }

  // 远程搜索
  async searchlistAction() {
    let keyword = this.get("keyword")
    let model = think.model("news");
    let map = [];//查询条件的封装
    map['newsTitle'] = new Array('like', '%' + keyword + '%');
    let searchlist = await model.where(map).select();
    // console.log("searchlist",searchlist);
    if (think.isEmpty(searchlist)) {
      searchlist = [];

      return this.fail(-1, "无法获取数据");
    }
    return this.success(searchlist, "success");
  }

  // 喜欢的文章
  async favlistAction() {

    let actionuserID = this.get("actionuserID")
    let model = think.model("action")
    let sql = `select actionnewsID from action where actionuserID = ${actionuserID}`
    let actres = await model.query(sql);
    // console.log("actres:", actres);

    var dataString = JSON.stringify(actres);
    // console.log("dataString:", dataString);
    var data = JSON.parse(dataString);
    // console.log("data:", data);

    var arr = [];
    for (var a in data) {
      arr.push(data[a].actionnewsID)
      // console.log("arr", arr);
    };

    let newsmodel = think.model("news");

    let sqlstr = `select news.* from news inner join action on news.newsID = action.actionnewsID where action.actionnewsID in (${arr}) order by actionDate desc`

    let favlist = await newsmodel.query(sqlstr);

    if (think.isEmpty(favlist)) {
      favlist = [];
      return this.fail(-1, "无法获取数据");
    }
    return this.success(favlist, "success");
  }



};
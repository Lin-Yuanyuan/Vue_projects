<template>
  <div class="search-maxbox">
    <el-input
      v-model="title"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      clearable
    ></el-input>
    <div class="search-result">{{ searchlist.length }}条搜索结果</div>
    <div class="search-result-max-box">
      <div
        class="search-result-item"
        v-for="(item, index) in searchlist"
        :key="index"
      >
        <Nuxt-link
          :to="{
            path: 'curiosity_window',
            query: { newsID: item.newsID },
          }"
        >
          <div class="search-result-content">
            <div
              class="search-result-title"
              v-html="brightenKeyword(item.newsTitle, title)"
            ></div>
            <div>
              <span class="search-result-category"  v-html="brightenKeyword(item.category, title)"></span>
              <span class="search-result-time">{{
                item.newsDate.substring(0, 10)
              }}</span>
            </div>
          </div>
        </Nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

//  截流(防抖)函数 写在script标签里
const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  layout: "comm",
  data() {
    return {
      title: "",
      searchlist: [],
    };
  },

  methods: {
    earch: function () {
      var _this = this;
      axios
        .get(
          "http://127.0.0.1:8360/user/news/searchlist?keyword=" + _this.title
        )
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.searchlist = res.data;
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "网络请求错误",
            message: "请检查后端接口及跨域问题",
          });
        });
    },

    brightenKeyword(val, keyword) {
      // 方法1：筛选变色
      // val = val + '';
      // if (val.indexOf(keyword) !== -1 && keyword !== '') {
      //     return val.replace(keyword, '<font color="#409EFF">' + keyword + '</font>')
      // } else {
      //     return val
      // }
      // 方法2：用正则表达式
      const Reg = new RegExp(keyword, "i");
      if (val) {
        const res = val.replace(
          Reg,
          `<span style="color: #ffc81f;">${keyword}</span>`
        );
        // console.log(res);
        return res;
      }
    },
  },

  // 上面的防抖函数(delay) 在 方法watch里调用 ，watch可以用来监测Vue实例上的title变动
  watch: {
    title() {
      var _this = this;
      delay(function () {
        _this.earch();
      }, 300);
    },
  },

  computed: {
    list: function () {
      var _this = this;
      var arrByZM = []; // 定义一个新的空数组用来存储匹配到的内容
      for (var i = 0; i < _this.searchlist.length; i++) {
        if (
          _this.searchlist[i].newsTitle.search(_this.title) != -1 ||
          _this.searchlist[i].category.search(_this.title) != -1
        ) {
          arrByZM.push(_this.searchlist[i]); // 将匹配到的内容添加到arrByZM数组中
        }
      }
      return arrByZM; // 返回新的数组
    },
  },
};
</script>

<style>
@import "@/static/css/search.css";
</style>

<style>
.search-result-max-box >>> .search-result-item {
  height: 70px;
}
.search-result-title {
  color: #000;
}
</style>

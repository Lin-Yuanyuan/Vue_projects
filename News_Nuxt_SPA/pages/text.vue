<template>
  <div class="search-maxbox">
    <el-autocomplete
      prefix-icon="el-icon-search"
      clearable
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      @keyup.enter.native="handleSubmit"
      value-key="newsTitle"
      :trigger-on-focus="false"
      @input="changeStyle('block', '.el-autocomplete-suggestion')"
      @keyup="changeStyle('block', '.el-autocomplete-suggestion')"
    >
    </el-autocomplete>
    <div>
      <div class="search-result">{{ searchlist.length }}条搜索结果</div>
      <div>
        <span v-for="(items, index) in searchlist" :key="index">{{
          items.newsTitle
        }}</span>
        <!-- <span>{{ items.newsContent }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "comm",
  data() {
    return {
      state: "",
      timeout: null,
      searchlist: [],
    };
  },

  methods: {
    querySearchAsync(queryString, cb) {
      let _this = this;
      //这里是调接口 根据输入关键字 获取匹配的数据
      axios
        .get(
          "http://127.0.0.1:8360/user/news/searchlist?keyword=" + queryString
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

      var searchlist = _this.searchlist;
      var results = queryString
        ? searchlist.filter(this.createStateFilter(queryString))
        : searchlist;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },

    createStateFilter(queryString) {
      return (state) => {
        return (
          state.newsTitle.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
      console.log("state",state)
    },

    handleSelect(item) {
      console.log(item);
    },

    handleSubmit() {
      this.changeStyle("none", ".el-autocomplete-suggestion");
    },

    changeStyle(status, className) {
      let dom = document.querySelectorAll(className);
      dom[0].style.display = status;
    },
  },
};
</script>

<style>
.search-maxbox {
  padding: 15px;
}
.el-autocomplete {
  width: 100%;
}
.search-result {
  line-height: 40px;
  border-bottom: 1px solid rgb(211, 207, 207);
  font-size: 13px;
}
</style>
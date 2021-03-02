<template>
  <div class="design-div-max-box">
    <div class="design-maxbox" v-for="(item, index) in deslist" :key="index">
      <Nuxt-link
        :to="{
          path: 'curiosity_window',
          query: { newsID: item.newsID },
        }"
      >
        <div class="design-textbox">
          <div class="design-box-l">
            <div class="design-title">
              <span class="design-title-span">{{ item.newsTitle }}</span>
            </div>
            <div class="design-iconbox">
              <span class="design-category icon">{{ item.category }}</span>
              <img
                class="design-pinglun icon"
                src="~/static/images/pinglun.png"
                alt=""
              />{{ item.comment }}
              <img
                class="design-xian icon"
                src="~/static/images/xian.png"
                alt=""
              />{{ item.action }}
              <span class="icon">{{ item.newsDate.substring(0, 10) }}</span>
            </div>
          </div>
        </div>
        <div class="design-imgbox">
          <img
            v-bind:src="item.newsImagePath | domain($store.state.domain)"
            alt=""
          />
        </div>
      </Nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      deslist: [],
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/deslist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.deslist = res.data;
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "网络请求错误",
            message: "请检查后端接口及跨域问题",
          });
        });
    },
  },

  created: function () {
    this.init();
  },

  filters: {
    domain: function (imgurl, dmstr) {
      if (imgurl == null || imgurl.length == 0) {
        return imgurl;
      }
      // console.log("imgurl",imgurl);
      if (imgurl.indexOf("http:") == 0) {
        return imgurl;
      } else {
        return dmstr + imgurl;
      }
    },
  },
};
</script>

<style>
.design-div-max-box {
  background: #eee;
}
.design-maxbox {
  width: 100%;
  height: 90px;
  margin-bottom: 5px;
  background: #fff;
}
.design-textbox {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}
.design-box-l {
  padding: 10px 6px;
}
.design-imgbox {
  width: 50%;
  height: 90px;
  float: right;
}
.design-imgbox img {
  width: 100%;
  height: 90px;
}
.design-title {
  font-size: 14px;
  font-weight: 800;
}
.design-title-span {
  -webkit-line-clamp:2;
  display:-webkit-box;
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
  overflow: hidden;
}
.design-pinglun {
  width: 15px;
  height: 15px;
}
.design-xian {
  width: 15px;
  height: 15px;
}
.design-iconbox {
  position: absolute;
  bottom: 8px;
}
a {
  color: inherit;
  text-decoration: none;
  border: none;
}
</style>
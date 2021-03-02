<template>
  <div class="fashion-div-max-box">
    <div
      class="fashion-main-box"
      v-for="(item, index) in fashlist"
      :key="index"
    >
      <Nuxt-link
        :to="{
          path: 'curiosity_window',
          query: { newsID: item.newsID },
        }"
      >
        <div class="fashion-main-img">
          <img
            v-bind:src="item.newsImagePath | domain($store.state.domain)"
            alt=""
          />
        </div>
        <div class="fashion-main-text">
          <div class="fashion-text-title">{{ item.newsTitle }}</div>
          <div class="fashion-text-desc">{{ item.newsDesc }}</div>
          <div class="fashion-iconbox">
            <span class="fashion-category icon">{{ item.category }}</span>
            <img
              class="fashion-pinglun icon"
              src="~/static/images/pinglun.png"
              alt=""
            />{{ item.comment }}
            <img
              class="fashion-xian icon"
              src="~/static/images/xian.png"
              alt=""
            />{{ item.action }}
            <span class="icon">{{ item.newsDate.substring(0, 10) }}</span>
          </div>
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
      fashlist: [],
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/fashlist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.fashlist = res.data;
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
.fashion-div-max-box {
  background: #eee;
}
.fashion-main-box {
  margin-bottom: 5px;
  background: #fff;
  margin-bottom: 5px;
}
.fashion-main-img img {
  width: 100%;
  height: 150px;
}
.fashion-main-text {
  padding: 0 15px;
}
.fashion-text-title {
  font-size: 14px;
  font-weight: 800;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.fashion-text-desc {
  line-height: 2;
  font-size: 13px;
}
.fashion-pinglun {
  width: 15px;
  height: 15px;
}
.fashion-xian {
  width: 15px;
  height: 15px;
}
</style>
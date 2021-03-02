<template>
  <div class="div-max-box">
    <div
      class="intelligence-maxbox"
      v-for="(item, index) in intelist"
      :key="index"
    >
      <Nuxt-link
        :to="{
          path: 'curiosity_window',
          query: { newsID: item.newsID },
        }"
      >
        <div class="intelligence-textbox">
          <div class="intelligence-box-l">
            <div class="intelligence-title">
              {{ item.newsTitle }}
            </div>
            <div class="intelligence-iconbox">
              <span class="intelligence-category icon">{{
                item.category
              }}</span>
              <img
                class="intelligence-pinglun icon"
                src="~/static/images/pinglun.png"
                alt=""
              />{{ item.comment }}
              <img
                class="intelligence-xian icon"
                src="~/static/images/xian.png"
                alt=""
              />{{ item.action }}
              <span class="icon">{{ item.newsDate.substring(0, 10) }}</span>
            </div>
          </div>
        </div>
        <div class="intelligence-imgbox">
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
      intelist: [],
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/intelist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.intelist = res.data;
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
.div-max-box {
  background: #eee;
}
.intelligence-maxbox {
  width: 100%;
  height: 90px;
  margin-bottom: 5px;
  background: #fff;
}
.intelligence-textbox {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}
.intelligence-box-l {
  padding: 10px 6px;
}
.intelligence-imgbox {
  width: 50%;
  height: 90px;
  float: right;
}
.intelligence-imgbox img {
  width: 100%;
  height: 90px;
}
.intelligence-title {
  font-size: 14px;
  font-weight: 800;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.intelligence-pinglun {
  width: 15px;
  height: 15px;
}
.intelligence-xian {
  width: 15px;
  height: 15px;
}
.intelligence-iconbox {
  position: absolute;
  bottom: 8px;
}

a {
  color: inherit;
  text-decoration: none;
  border: none;
}
</style>
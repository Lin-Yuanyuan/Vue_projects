<template>
  <div class="culture-div-max-box">
    <div class="culture-maxbox" v-for="(item, index) in cultlist" :key="index">
      <Nuxt-link
        :to="{
          path: 'curiosity_window',
          query: { newsID: item.newsID },
        }"
      >
        <div class="culture-textbox">
          <div class="culture-box-l">
            <div class="culture-title">
              {{ item.newsTitle }}
            </div>
            <div class="culture-iconbox">
              <span class="culture-category icon">{{ item.category }}</span>
              <img
                class="culture-pinglun icon"
                src="~/static/images/pinglun.png"
                alt=""
              />{{ item.comment }}
              <img
                class="culture-xian icon"
                src="~/static/images/xian.png"
                alt=""
              />{{ item.action }}
              <span class="icon">{{ item.newsDate.substring(0, 10) }}</span>
            </div>
          </div>
        </div>
        <div class="culture-imgbox">
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
      cultlist: [],
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/cultlist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.cultlist = res.data;
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
.culture-div-max-box {
  background: #eee;
}
.culture-maxbox {
  width: 100%;
  height: 90px;
  margin-bottom: 5px;
  background: #fff;
}
.culture-textbox {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}
.culture-box-l {
  padding: 10px 6px;
}
.culture-imgbox {
  width: 50%;
  height: 90px;
  float: right;
}
.culture-imgbox img {
  width: 100%;
  height: 90px;
}
.culture-title {
  font-size: 14px;
  font-weight: 800;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.culture-pinglun {
  width: 15px;
  height: 15px;
}
.culture-xian {
  width: 15px;
  height: 15px;
}
.culture-iconbox {
  position: absolute;
  bottom: 8px;
}

a {
  color: inherit;
  text-decoration: none;
  border: none;
}
</style>
<template>
  <div class="enter-div-max-box">
    <div class="enter-maxbox" v-for="(item, index) in enterlist" :key="index">
      <Nuxt-link
        :to="{
          path: 'curiosity_window',
          query: { newsID: item.newsID },
        }"
      >
        <div class="enter-textbox">
          <div class="enter-box-l">
            <div class="enter-title">
              {{ item.newsTitle }}
            </div>
            <div class="enter-iconbox">
              <span class="enter-category icon">{{ item.category }}</span>
              <img
                class="enter-pinglun icon"
                src="~/static/images/pinglun.png"
                alt=""
              />{{ item.comment }}
              <img
                class="enter-xian icon"
                src="~/static/images/xian.png"
                alt=""
              />{{ item.action }}
              <span class="icon">{{ item.newsDate.substring(0, 10) }}</span>
            </div>
          </div>
        </div>
        <div class="enter-imgbox">
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
      enterlist: [],
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/enterlist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.enterlist = res.data;
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
.enter-div-max-box {
  background: #eee;
}
.enter-maxbox {
  width: 100%;
  height: 90px;
  margin-bottom: 5px;
  background: #fff;
}
.enter-textbox {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}
.enter-box-l {
  padding: 10px 6px;
}
.enter-imgbox {
  width: 50%;
  height: 90px;
  float: right;
}
.enter-imgbox img {
  width: 100%;
  height: 90px;
}
.enter-title {
  font-size: 14px;
  font-weight: 800;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.enter-pinglun {
  width: 15px;
  height: 15px;
}
.enter-xian {
  width: 15px;
  height: 15px;
}
.enter-iconbox {
  position: absolute;
  bottom: 8px;
}

a {
  color: inherit;
  text-decoration: none;
  border: none;
}
</style>
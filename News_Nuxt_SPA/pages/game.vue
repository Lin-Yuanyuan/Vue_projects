<template>
  <div class="game-div-max-box">
    <div class="game-maxbox" v-for="(item, index) in gamelist" :key="index">
      <Nuxt-link
        :to="{
          path: 'curiosity_window',
          query: { newsID: item.newsID },
        }"
      >
        <div class="game-textbox">
          <div class="game-box-l">
            <div class="game-title">
              {{ item.newsTitle }}
            </div>
            <div class="game-iconbox">
              <span class="game-category icon">{{ item.category }}</span>
              <img
                class="game-pinglun icon"
                src="~/static/images/pinglun.png"
                alt=""
              />{{ item.comment }}
              <img
                class="game-xian icon"
                src="~/static/images/xian.png"
                alt=""
              />{{ item.action }}
              <span class="icon">{{ item.newsDate.substring(0, 10) }}</span>
            </div>
          </div>
        </div>
        <div class="game-imgbox">
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
      gamelist: [],
    };
  },

  methods: {
    init: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/gamelist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.gamelist = res.data;
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
.game-div-max-box {
  background: #eee;
}
.game-maxbox {
  width: 100%;
  height: 90px;
  margin-bottom: 5px;
  background: #fff;
}
.game-textbox {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}
.game-box-l {
  padding: 10px 6px;
}
.game-imgbox {
  width: 50%;
  height: 90px;
  float: right;
}
.game-imgbox img {
  width: 100%;
  height: 90px;
}
.game-title {
  font-size: 14px;
  font-weight: 800;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.game-pinglun {
  width: 15px;
  height: 15px;
}
.game-xian {
  width: 15px;
  height: 15px;
}
.game-iconbox {
  position: absolute;
  bottom: 8px;
}
a {
  color: inherit;
  text-decoration: none;
  border: none;
}
</style>
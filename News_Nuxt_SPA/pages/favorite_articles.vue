<template>
  <div>
    <div class="favorite-max-box">
      <div
        class="favorite-maxbox"
        v-for="(item, index) in favlist"
        :key="index"
      >
        <Nuxt-link
          :to="{
            path: 'curiosity_window',
            query: { newsID: item.newsID },
          }"
        >
          <div class="favorite-textbox">
            <div class="favorite-box-l">
              <div class="favorite-title">
                {{ item.newsTitle }}
              </div>
              <div class="favorite-iconbox">
                <span class="favorite-category icon">{{ item.category }}</span>
                <span class="icon">{{ item.newsDate.substring(0, 10) }}</span>
              </div>
            </div>
          </div>
          <div class="favorite-imgbox">
            <img
              v-bind:src="item.newsImagePath | domain($store.state.domain)"
              alt=""
            />
          </div>
        </Nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "individ",
  data() {
    return {
      favlist: [],
      actionuserID: "",
    };
  },
  methods: {
    init: function () {
      var _this = this;
      let actionuserID = _this.$store.state.userID;
      console.log("actionuserID", actionuserID);
      axios({
        url: _this.$store.state.domain + "/user/news/favlist",
        method: "post",
        params: { actionuserID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.favlist = res.data;
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
.favorite-max-box {
  background: #eee;
}
.favorite-maxbox {
  width: 100%;
  height: 90px;
  margin-bottom: 5px;
  background: #fff;
}
.favorite-textbox {
  width: 50%;
  height: 100%;
  float: left;
  position: relative;
}
.favorite-box-l {
  padding: 10px 6px;
}
.favorite-imgbox {
  width: 50%;
  height: 90px;
  float: right;
}
.favorite-imgbox img {
  width: 100%;
  height: 90px;
}
.favorite-title {
  font-size: 14px;
  font-weight: 800;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.favorite-pinglun {
  width: 15px;
  height: 15px;
}
.favorite-xian {
  width: 15px;
  height: 15px;
}
.favorite-iconbox {
  position: absolute;
  bottom: 8px;
}

a {
  color: inherit;
  text-decoration: none;
  border: none;
}
</style>
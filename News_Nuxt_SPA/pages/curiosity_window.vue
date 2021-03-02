<template>
  <div>
    <div v-for="(item, index) in windowlist" :key="index">
      <div>
        <div class="curiosity_details">
          <div class="curiosity_details-header">
            <img
              class="curiosity_details-cover-img"
              :src="item.newsImagePath | domain($store.state.domain)"
              alt=""
            />
            <div class="curiosity_details_maxbox">
              <div class="details-header-titlebox">
                <div class="details-header-title">
                  <img
                    width="18px"
                    height="18px"
                    class="details-header-icon"
                    src="@/static/images/zhuanqian.png"
                    alt=""
                  />
                  <span class="details-header-icontext" style="">{{
                    item.category
                  }}</span>
                </div>
                <div class="details-details-title">
                  <h2>{{ item.newsTitle }}</h2>
                </div>
                <div class="details-details-time">
                  <span>{{ item.newsDate.substring(0, 10) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-window">
        <div class="content-header">
          <span class="content-header-ctegory">{{ item.newsDesc }} </span>
        </div>
        <div class="window-content" v-html="item.newsContent"></div>
      </div>

      <div class="article-footer-maxbox">
        <div class="article-footer-icon-box">
          <div class="article-footer-icon-fanhui">
            <div to="" @click="$router.push('/')">
              <img
                width="22px"
                height="22px"
                src="@/static/images/fanhui.png"
                alt=""
              />
            </div>
          </div>
          <div class="article-footer-iconitem">
            <Nuxt-link
              :to="{
                path: 'comment',
                query: { newsID: item.newsID, newsTitle: item.newsTitle },
              }"
            >
              <li class="article-footer-icon">
                <img
                  width="22px"
                  height="22px"
                  src="@/static/images/pinglun.png"
                  alt=""
                />
              </li>

              <span style="color: #000">
                {{ item.comment }}
              </span>
            </Nuxt-link>

            <li class="article-footer-icon">
              <img
                width="22px"
                height="22px"
                @click="addLikeNum()"
                :src="liked ? './images/xihuan2.png' : './images/xian.png'"
                alt=""
              />
            </li>

            <span style="color: #000"> {{ item.action }} </span>

            <li class="article-footer-icon">
              <img
                width="22px"
                height="22px"
                src="@/static/images/fenxiang.png"
                alt=""
              />
            </li>
          </div>
        </div>
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
      windowlist: [],
      liked: false,
    };
  },

  methods: {
    windowinit: function () {
      var _this = this;
      let newsID = _this.$route.query.newsID;
      axios({
        url: _this.$store.state.domain + "/user/news/windowlist",
        method: "get",
        params: { newsID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.windowlist = res.data;
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "网络请求错误",
            message: "请检查后端接口及跨域问题",
          });
        });
    },

    addLikeNum: function (item) {
        // this.windowinit();
      var _this = this;
      let newsID = _this.$route.query.newsID;
      let newsTitle = _this.$route.query.newsTitle;
      let userID = _this.$store.state.userID;
      let userName = _this.$store.state.userName;

      if (!_this.$store.state.islogin) {
        alert("请登录!");
        _this.$router.push({
          path: "login",
        });
      } else {
        this.windowinit();
        if (!this.liked) {
          axios({
            url: this.$store.state.domain + "/user/ucenter/addLike",
            method: "post",
            params: { newsID, userID, userName },
          })
            .then(function (response) {
              var res = response.data;
              if (res.errno == 0) {
                // _this.$notify.success({
                //   title: "点赞成功",
                //   message: "成功",
                // });
              }
            })
            .catch(function () {
              // _this.$notify.error({
              //   title: "网络请求错误",
              //   message: "请检查后端接口及跨域问题",
              // });
            });
          // this.showlike();
          this.windowinit();
        } else {
          this.windowinit();
          axios({
            url: _this.$store.state.domain + "/user/ucenter/delike",
            method: "post",
            params: { newsID, userID },
          })
            .then(function (response) {
              var res = response.data;
              if (res.errno == 0) {
                // _this.$notify.success({
                //   title: "赞删除",
                //   message: "删除",
                // });
              }
            })
            .catch(function () {
              // _this.$notify.error({
              //   title: "网络请求错误",
              //   message: "请检查后端接口及跨域问题",
              // });
            });
          this.windowinit();
        }
      }
      // liked 为true时 like_count-- 并把liked取反
      this.liked = !this.liked; //把liked取反
    },
  },

  created: function () {
    this.windowinit();
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
@import "@/static/css/subheader.css";
@import "@/static/css/subfooter.css";
.window-content {
  padding: 0 15px;
}
.article-footer-maxbox {
  bottom: 0;
  position: fixed;
  z-index: 9;
  background-color: #fff;
}
.window-content {
  margin-bottom: 50px;
}
.content-header {
  padding: 10px 15px;
}
</style>
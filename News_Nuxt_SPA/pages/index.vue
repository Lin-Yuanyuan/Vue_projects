<template>
  <div style="position: relative;">
    
    <el-carousel
      width="100%"
      height="180x"
      indicator-position="none"
      :interval="3000"
    >
      <el-carousel-item v-for="(item, index) in bannerlist" :key="index">
        <nuxt-link
          :to="{
            path: 'curiosity_window',
            query: { newsID: item.newsID },
          }"
          class="lable"
        >
          <!-- <p class="category">{{ item.category }}</p> -->
          <span class="newstitle"> {{ item.newsTitle }}</span>
        </nuxt-link>
        <img
          class="curiosityimg"
          v-bind:src="item.newsImagePath | domain($store.state.domain)"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>

    <div class="articles-conent">
      <div
        v-for="(item, index) in conentlist"
        :key="index"
        :id="'conent' + index"
        class="articleitembox"
      >
        <nuxt-link
          :to="{
            path: 'curiosity_window',
            query: { newsID: item.newsID, newsTitle: item.newsTitle },
          }"
        >
          <div class="articleitem">
            <div class="article-hd">
              <img
                width="100%"
                height="140px"
                v-bind:src="item.newsImagePath | domain($store.state.domain)"
                alt=""
              />
            </div>
            <div class="article-cover-title">
              <div class="cover-title">
                <span class="title">{{ item.newsTitle }}</span>
              </div>
              <div class="article-cover-bottom-text">
                <div class="">
                  <img
                  class="article-cover-icon"
                    src="@/static/images/tongqian2.png"
                    alt=""
                  />
                  <span
                    class="article-cover-text"
                    >{{ item.category }}</span
                  >
                </div>
                <div
                  class="article-cover-time"
                >
                  <span>{{ item.newsDate.substring(0, 10) }}</span>
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  layout: "default",
  data() {
    return {
      bannerlist: [],
      conentlist: [],
    };
  },
  methods: {
    init: function () {
      var _this = this;
      axios({
        url: "http://127.0.0.1:8360/user/news/bannerlist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.bannerlist = res.data;
          }
        })
        .catch(function () {
          _this.$notify.error({
            title: "网络请求错误",
            message: "请检查后端接口及跨域问题",
          });
        });
    },

    conentinit: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/conentlist",
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.conentlist = res.data;
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
    this.conentinit();
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
@import "@/static/css/index.css";
.cover-title .title{
  -webkit-line-clamp:2;
  display:-webkit-box;
  -webkit-box-orient: vertical;
  text-overflow:ellipsis;
  overflow: hidden;
}
</style>
<template>
  <div>
    <div class="articles">
      <div class="articles-banner">
        <div class="block">
          <el-carousel height="450px" indicator-position="" :interval="4000">
            <el-carousel-item v-for="(item, index) in bannerlist" :key="index">
              <nuxt-link
                :to="{
                  path: 'user/curiosity_window',
                  query: { newsID: item.newsID },
                }"
                target="_blank"
                class="lable"
              >
                <p class="category">{{ item.category }}</p>
                <span class="newstitle"> {{ item.newsTitle }}</span>
              </nuxt-link>
              <img
                width="755px"
                height="450px"
                v-bind:src="item.newsImagePath | domain($store.state.domain)"
                alt=""
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="articles-banright">

      </div>
    </div>

    <div class="articles-conent">
      <div
        v-for="(item, index) in conentlist"
        :key="index"
        :id="'conent' + index"
        class="articleitembox"
      >
        <nuxt-link
          :to="{
            path: 'user/curiosity_window',
            query: { newsID: item.newsID, newsTitle: item.newsTitle },
          }"
          target="_blank"
        >
          <div class="articleitem" style="position: relative">
            <div class="article-hd">
              <img
                width="500px"
                height="185px"
                v-bind:src="item.newsImagePath | domain($store.state.domain)"
                alt=""
              />
            </div>
            <div style="width: 96%; margin: 0 auto">
              <div
                style="
                  margin-top: 5px;
                  width: 480px;
                  height: 60px;
                  overflow: hidden;
                "
              >
                <span
                  class="title"
                  style="
                    background: #000;
                    font-size: 20px;
                    line-height: 30px;
                    width: 480px;
                    height: 60px;
                    color: #fff;
                  "
                  >{{ item.newsTitle }}</span
                >
              </div>
              <div
                class="time"
                style="margin-top: 5px; color: #666; font-size: 12px"
              >
                <span>{{ item.newsDate.substring(0, 10) }}</span>
              </div>
              <div style="position: absolute; top: 11px; left: 11px">
                <img
                  style="float: left; width: 22px; height: 22px"
                  src="/images/tongqian2.png"
                  alt=""
                />
                <span
                  class="icontext"
                  style="
                    float: left;
                    color: #fff;
                    font-size: 12px;
                    line-height: 22px;
                    margin-left: 6px;
                  "
                  >{{ item.category }}</span
                >
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
  layout: "curiosity",
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
        url: _this.$store.state.domain + "/user/news/bannerlist",
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
.articles {
  width: 100%;
  height: 450px;
  margin-top: 15px;
  color: #fff;
}

.articles-banner {
  width: 755px;
  height: 450px;
  float: left;
}

.articles-banright{
  width: 245px;
  height:100%;
  background: rosybrown;
  float: right;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__container .el-carousel__arrow--left{
  color: #fff;
  font-size: 30px;
}

.el-carousel__container .el-carousel__arrow--right{
  color: #fff;
  font-size: 30px;
}

.lable {
  position: absolute;
  width: 96%;
  bottom: 60px;
  margin: 0 20px;
  font-size: 26px;
  color: #fff;
}
.category {
  width: 40px;
  height: 20px;
  font-size: 12px;
  color: #ffc81f;
  background: #000;
  line-height: 20px;
  text-align: center;
}
.newstitle {
  margin-top: 20px;
  background: #000;
  font-weight: 400;
  line-height: 45px;
}

.articleitembox {
  width: 500px;
  height: 280px;
  background-color: #fff;
  margin-top: 15px;
  float: left;
}

.articleitembox:nth-child(2n) {
  margin-left: 10px;
}

.article-hd {
  overflow: hidden;
}
.articles-conent img {
  transition: all 2s; /*图片放大过程的时间*/
}

.articles-conent img:hover {
  transform: scale(1.1); /*以y轴为中心旋转*/
}


</style>
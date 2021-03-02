<template>
  <div>
    <div
      class="curiosity_details"
      v-for="(item, index) in windowlist"
      :key="index"
    >
      <div class="curiosity_details-header">
        <img
          style="width: 100%; height: 450px; margin: 0 auto; display: block"
          :src="item.newsImagePath | domain($store.state.domain)"
          alt=""
        />
        <div class="header-title">
          <div class="header-icon">
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
          <div class="detailstitle">
            <h2>{{ item.newsTitle }}</h2>
          </div>
        </div>
      </div>
      <div class="main-window">
        <div class="content-header">
          <span class="content-header-ctegory"
            >我们每天为你摘取最重要的{{ item.category }}新闻</span
          >
        </div>
        <div class="window-content" v-html="item.newsContent"></div>
      </div>

      <div class="curiosity_details-comment">
        <div class="details-comment">
          <div class="make-comment">
            <p class="comment-count">评论</p>
            <div class="commentbox">
              <a href="" class="avatar"
                ><img class="avatarimg" src="/images/missing_face.png"
              /></a>
              <div>
                <div class="comment-form">
                  <textarea
                    v-model="comment.commentContent"
                    prop="commentContent"
                    rows="6"
                    class="content"
                    placeholder="有什么想说的吗~~~"
                  ></textarea>
                  <div class="share-submit">
                    <a href="" class="btn-submit" @click="Postcomments()"
                      >评论</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="comment-reply-box">
          <div class="comment-reply-title">
            <p class="comment-all">全部评论</p>
            <div class="comment-center" id="J_CommentCenter">
              <span class="comment-center-slash">/</span
              ><span class="comment-my J_userCenter">我的评论</span>
            </div>
            <p class="comment-sort">
              <span class="J_CommentSort">最新</span>
              &nbsp;/&nbsp;
              <span class="J_CommentSort comment-sort-cur">最热</span>
            </p>
          </div>

          <div class="comment-reply-content">
            <div
              class="reply-content-content-box"
              v-for="(item, index) in commentlist"
              :key="index"
            >
              <div>
                <a href="" class="avatar"
                  ><img class="avatarimg" src="/images/missing_face.png"
                /></a>
                <div class="reply-content-box">
                  <p class="comment-user">
                    <span class="comment-username">流浪的猫</span>
                    <span class="comment-time">8小时前</span>
                  </p>
                  <div class="comment-content-CommentContent">
                    {{ item.commentContent }}
                  </div>
                  <!-- <div class="reply-ReplyBlock">
  <div class="reply-block-box">
    <div class="reply-content">
      <span class="reply-user">
        <b class="reply-user-nick">夺魁Q</b>
      </span>
      挂掉特朗普上场
    </div>
    <div
      class="reply-operate reply-operate--hot"
      data-id="6754528882967210305"
      data-targetid="6373013014"
    >
      <span class="J_Vote reply-operate-item reply-up"
        >赞<i>33</i></span
      >
      <i class="reply-dot">·</i>
      <span
        class="J_Reply reply-operate-item"
        id="J_Reply6754528882967210305"
        data-nick="夺魁Q"
        data-userid="914138596"
        >回复</span
      >
      <i class="reply-dot">·</i> <span>9小时前</span>
    </div>
  </div>
</div>  -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  layout: "curiosity_window",
  data() {
    return {
      windowlist: [],
      comment: {
        commentNewsID: this.$route.query.newsID,
        commentNewsTitle: this.$route.query.newsTitle,
        commentContent: "",
      },
      commentlist: [],
    };
  },

  methods: {
    windowinit: function () {
      var _this = this;
      let newsID = this.$route.query.newsID;
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

    Postcomments: function () {
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/addcomment",
        params: _this.comment,
      }).then(function (response) {
        var res = response.data;
        if (res.errno == 0) {
          _this.$notify({
            title: "成功",
            message: res.msg,
            type: "success",
          });
        } else {
          _this.$notify.error({
            title: "失败",
            message: res.errmsg,
          });
        }
      });
    },

    showcomments: function () {
      let commentNewsID = this.$route.query.newsID;
      var _this = this;
      axios({
        url: _this.$store.state.domain + "/user/news/commentlist",
        params: { commentNewsID },
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            _this.commentlist = res.data;
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
    this.windowinit();
    this.showcomments();
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
@import "static/css/user/curiosity_window.css";
</style>
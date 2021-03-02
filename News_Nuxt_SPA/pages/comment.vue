<template>
  <div class="comment-reply-content">
    <div class="comment-reply-content-maxbox">
      <div class="comment-reply-header">
        <Nuxt-link
          :to="{
            path: 'curiosity_window',
            query: {
              newsID: this.$route.query.newsID,
              newsTitle: this.$route.query.newsTitle,
            },
          }"
        >
          <img
            class="comment-reply-headerimg"
            width="22px"
            height="22px"
            src="/images/fanhui.png"
            alt=""
          />
        </Nuxt-link>
        <span class="comment-reply-header-text"
          >{{ commentlist.length }}条评论</span
        >
      </div>
      <div
        class="reply-content-content-box"
        v-for="(item, index) in commentlist"
        :key="index"
      >
        <div>
          <a href="" class="comment-reply-avatar"
            ><img
              width="30px"
              height="30px"
              class="comment-reply-avatarimg"
              src="/images/missing_face.png"
          /></a>
          <div class="reply-content-box">
            <p class="comment-user">
              <span class="comment-username">{{ item.commentUserName }}</span>
              <span class="comment-time">{{
                item.commentDate.substring(5, 16)
              }}</span>
              <!-- <span class="comment-replay" @click="reply()">回复</span> -->
              <span class="comment-like"> <i class="el-icon-thumb"></i></span>
            </p>
            <div
              class="comment-content-CommentContent"
              v-html="item.commentContent"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-input">
      <el-input
        v-model="comment.commentContent"
        prop="commentContent"
        clearable
        placeholder="添加评论..."
        @keyup.enter.native="Postcomments()"
      ></el-input>
      <el-button
        class="comment-button"
        type="warning"
        round
        @click="Postcomments()"
        >发送</el-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "comm",
  data() {
    return {
      input: "",
      comment: {
        commentNewsID: this.$route.query.newsID,
        commentNewsTitle: this.$route.query.newsTitle,
        commentContent: "",
        commentUserID: this.$store.state.userID,
        commentUserName: this.$store.state.userName,
      },
      commentlist: [],
    };
  },

  methods: {
    showcomments: function () {
      var _this = this;
      let commentNewsID = this.$route.query.newsID;
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

    Postcomments: function () {
      var _this = this;
      let commentUserID = _this.$store.state.userID;
      let commentUserName = _this.$store.state.userName;
      // console.log("commentUserID", commentUserID);
      // console.log("commentUserName", commentUserName);
      if (!_this.$store.state.islogin) {
        alert("请登录!");
        _this.$router.push({
          path: "login",
        });
      } else {
        _this.showcomments();
        axios({
          url: _this.$store.state.domain + "/user/news/addcomment",
          method: "post",
          params: _this.comment,
        }).then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            // _this.$notify({
            //   title: "成功",
            //   message: res.msg,
            //   type: "success",
            // });
          } else {
            _this.$notify.error({
              title: "失败",
              message: res.errmsg,
            });
          }
        });

        _this.showcomments();
      }
    },

    reply: function () {
      var _this = this;
    },
  },

  created: function () {
    this.showcomments();
  },

  // mounted:function(){
  //   this.showcomments();
  // }
};
</script>

<style>
@import "@/static/css/comment.css";
.comment-input {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.comment-reply-content-maxbox {
  margin-bottom: 50px;
}
.comment-button {
  position: fixed;
  bottom: 5px;
  right: 0;
  font-size: 12px;
}
.el-input__inner {
  border-top: 1px solid rgb(218, 210, 210);
  border-bottom: 1px solid rgb(218, 210, 210);
}
.el-button.is-round {
  padding: 7px 15px;
  border-radius: 12px;
}
.comment-like {
  font-size: 15px;
  float: right;
}
.comment-replay {
  padding-left: 10px;
}
</style>
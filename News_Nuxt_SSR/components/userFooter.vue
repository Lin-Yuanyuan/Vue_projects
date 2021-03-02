<template>
<div>
  <div class="com-page-footer">
    <div class="page-footer-bd">
      <ul class="items categories">
        <li class="footer-category "><a href="">首页</a></li>
        <li class="footer-category"><a href="">长文章</a></li>
        <li class="footer-category"><a href="">TOP 15</a></li>
        <li class="footer-category"><a href="">10 个图</a></li>
        <li class="footer-category"><a href="">好奇心研究所</a></li>
        <li class="footer-category">
          <a href="">100个有想法的人</a>
        </li>
        <li class="footer-category"><a href="">Medium</a></li>
      </ul>
      <ul class="items categories">
        <li class="footer-category">
          <a href="">大公司头条</a>
        </li>
        <li class="footer-category">
          <a href="">Q Business</a>
        </li>
        <li class="footer-category"><a href="">今日应用</a></li>
        <li class="footer-category"><a href="">这世界</a></li>
        <li class="footer-category">
          <a href="">Best on the web</a>
        </li>
        <li class="footer-category"><a href="">商业</a></li>
        <li class="footer-category"><a href="">智能</a></li>
      </ul>
      <ul class="items">
        <li class="footer-category"><a href="">设计</a></li>
        <li class="footer-category"><a href="">时尚</a></li>
        <li class="footer-category"><a href="">娱乐</a></li>
        <li class="footer-category"><a href="">城市</a></li>
        <li class="footer-category"><a href="">游戏</a></li>
      </ul>
      <ul class="items ribbons">
        <li class="foot-ribbon">
          <a href="">下载APP</a>
        </li>
        <li class="foot-ribbon">
          <a href="#" class="user">登录 / 注册</a>
        </li>
        <li class="foot-ribbon">
          <a href="">订阅</a>
        </li>
        <li class="foot-ribbon">
          <a href="">微博</a>
        </li>
        <li class="foot-ribbon">
          <a href="#" class="weixin">微信 </a>
        </li>
        <li class="foot-ribbon">
          <a href="">用户协议</a>
        </li>
        <li class="foot-ribbon">
          <a href="" class="btn-privacy">隐私政策</a>
        </li>
      </ul>
      <ul class="items ribbons">
        <li class="foot-ribbon">
          <a href="">关于好奇心</a>
        </li>
        <li class="foot-ribbon">
          <a href="">联系我们</a>
        </li>
        <li class="foot-ribbon">
          <a href="">版权声明</a>
        </li>
      </ul>
    </div>
    <div class="page-footer-ft">
      <div class="copyright">
        <p class="company" style="margin: 0">
          2014 北京酷睿奥思科技发展有限公司
        </p>
        <p class="icp">京ICP备14027177号-1</p>
        <a
          style="
            display: inline-block;
            text-decoration: none;
            margin-left: 10px;
          "
        >
          <img
            class="lazyloaded"
            style="float: left; height: 16px; margin-top: 2px"
            src="/images/ghs.png"
          />
          <p style="float: left; margin: 0 0 0 5px">
            京公网安备 11010502030071号
          </p>
        </a>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {};
</script>

<style>
.com-page-footer {
  margin-top: 20px;
  widows: 100%;
  height: 100%;
  background-color: #000;
}
.page-footer-bd {
  height: 200px;
  width: 900px;
  margin: 0 auto;
  padding: 18px 0;
}
.com-page-footer .page-footer-bd .items {
  float: left;
  padding: 0 15px;
  width: 150px;
  line-height: 30px;
}

.footer-category {
  height: 30px;
  color: #fff;
  line-height: 30px;
}

.foot-ribbon {
  height: 30px;
  color: #fff;
  line-height: 30px;
}

.com-page-footer .page-footer-bd .items a{
  color: #fff;
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 14px;
}

.com-page-footer .page-footer-ft {
  background-color: #191919;
  text-align: center;
}
a,
img {
  vertical-align: top;
}
.com-page-footer .page-footer-ft .copyright {
  display: inline-block;
  margin: 0 auto;
  padding: 18px 0;
  text-align: right;
  font-size: 14px;
}
.com-page-footer .page-footer-ft .copyright .icon-logo {
  color: #d1d1d1;
  font-size: 40px;
  line-height: 40px;
}
.com-page-footer .page-footer-ft .copyright p {
  margin-left: 44px;
  color: #fff;
  color: hsla(0, 0%, 100%, 0.8);
  line-height: 20px;
}
.com-page-footer .page-footer-ft .copyright .icp {
  display: inline-block;
}

.page-footer-ft .company {
  text-align: center;
}

.com-page-footer .page-footer-bd .items a:hover {
  color: #ffc81f;
}

.com-page-footer .page-footer-bd .items a:focus {
  color: #ffc81f;
}
</style>
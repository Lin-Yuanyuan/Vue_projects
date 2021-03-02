import axios from "axios";


export default function ({ app }) {
  // app.router.beforeEach(function (to, from, next) {

    // var authPath = ["/individual"];
  
    //是否需要鉴权操作同行的页面路径数组
    // if (authPath.indexOf(to.path) != -1) { //authPath.includes(to.path)
      axios({
        url: app.store.state.domain + "/user/ucenter/getsess",
        method: "get",
        // `withCredentials` 表示跨域请求时是否需要使用凭证
        withCredentials: true, // default:false
        //注意：客户端请求的url路径域名要求和服务端一致
        //客户端 http://127.0.0.1:3000/
        //服务端 http://127.0.0.1:8360/
        // http://127.0.0.1 要一样
      })
        .then(function (response) {
          var res = response.data;
          if (res.errno == 0) {
            console.log("已经登录");
            app.store.dispatch("login");
            app.store.dispatch("saveuser", res.data);
            // console.log("saveuser", res.data);
            // next();
          } else {
            console.log("navguard未登录...");
            app.store.dispatch("logout");
            // next({ path: "login" });
            // next();
            //   app.router.push({path:"login"});
          }
        })
        .catch(function (error) {
          console.log("error:", error);
        });




    // } 
    // else {
    //   next();
    // }

  // });
  // app.router.beforeEach(function(to, from,next){
  //     console.log("before原路径：",from.path);
  //     console.log("before目的路径：",to.path);
  //     // next(); //路由放行
  //     if(to.path == "/second"){
  //         // next("/three"); //重定向
  //         next({path:"/three",query:{"pname":"beforeEach中重定向",test:789}})
  //         // app.router.push({path:"/three",query:{pname:"beforeEach中重定向"}});
  //         // 在.js文件中 app.router 在 .vue文件中使用 this.$router
  //         // 在.js文件中 app.store  在 .vue文件中使用 this.$store
  //     }
  //     setTimeout(function(){
  //         next();
  //     },2000);
  //     // next();
  // });
  app.router.afterEach(function (to, from) {
    // console.log("after原路径：", from.path);
    // console.log("after目的路径：", to.path);
  })


}

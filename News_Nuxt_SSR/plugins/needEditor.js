import EE from "wangeditor";
// import Swiper from "swiper";
export default function({ app }){

    app.router.afterEach(function(to, from){
        // 此处已经到达页面，可以使用window对象
        Window.prototype.wangEditor = EE;
        // Window.prototype.Swiper = Swiper;
        // console.log("使用Swiper:", Swiper); 
        // 相当于 <script src="....js"></script>
        // console.log("使用wangEditor:", wangEditor); //window.wangEditor
        // console.log("使用wangEditor:", window.wangEditor);
    })
}
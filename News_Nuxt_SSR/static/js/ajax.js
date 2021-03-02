/**
 * 解决跨域问题
 * header('Access-Control-Allow-Origin:*');
 * JOSNP:<?PHP echo $_GET['callback'].'({"name":"kwin"})';
 *
 * [ajax description]
 * @param  object obj
 {
 type:"post|get",
 url:"http://example.com",
 async:"true",
 dataType:"HTML|text|XML|JSON|JSONP",
 data:{},
 beforeSend:function(xmlhttp){},
 success:functuon(data){},
 error:function(err){}
 }
 * @return {[type]}     [description]
 */
function ajax(obj) {
    var xmlhttp, type, url, async, dataType, data;
    if (typeof(obj) != 'object')  return false;

    type = obj.type == undefined ? 'POST' : obj.type.toUpperCase();
    url = obj.url == undefined ? window.location.href : obj.url;
    async = obj.async == undefined ? true : obj.async;
    dataType = obj.dataType == undefined ? 'HTML' : obj.dataType.toUpperCase();
    data = obj.data == undefined ? {} : obj.data;


    var formatParams = function () {
        if (typeof(data) == "object") {
            var str = "";
            for (var pro in data) {
                str += pro + "=" + data[pro] + "&";
            }
            data = str.substr(0, str.length - 1);
        }
        if (type == 'GET' || dataType == 'JSONP') {
            if (url.lastIndexOf('?') == -1) {
                url += '?' + data;
            } else {
                url += '&' + data;
            }
        }
    }
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (dataType == 'JSONP') {
        if (typeof(obj.beforeSend) == 'function')obj.beforeSend(xmlhttp);
        var callbackName = ('jsonp_' + Math.random()).replace(".", "");
        var oHead = document.getElementsByTagName('head')[0];
        data.callback = callbackName;
        var ele = document.createElement('script');
        ele.type = "text/javascript";
        ele.onerror = function () {
            console.log('请求失败');
            obj.error && obj.error("请求失败");
        };

        oHead.appendChild(ele);
        window[callbackName] = function (json) {
            oHead.removeChild(ele);
            window[callbackName] = null;
            obj.success && obj.success(json);
        };
        formatParams();
        ele.src = url;
        return ;
    } else {
        formatParams();
        xmlhttp.open(type, url, async);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        if (typeof(obj.beforeSend) == 'function')obj.beforeSend(xmlhttp);
        xmlhttp.send(data);
        var cbfunc = function () {
            if (xmlhttp.status != 200) {
                console.log(xmlhttp.status + '错误');
                obj.error && obj.error(xmlhttp.status + '错误');
                return ;
            }
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                if (dataType == 'JSON') {
                    try {
                        res = JSON.parse(xmlhttp.responseText);
                    } catch (e) {
                        console.log('返回的json格式不正确');
                        obj.error('返回的json格式不正确');
                    }

                } else if (dataType == 'XML') {
                    res = xmlhttp.responseXML;
                } else {
                    res = xmlhttp.responseText;
                }

                obj.success && obj.success(res);

            }
        }
        // console.log("同步",xmlhttp);
        if(async){
            xmlhttp.onreadystatechange = cbfunc;
        }else{
            cbfunc(); 
        }
    }
}
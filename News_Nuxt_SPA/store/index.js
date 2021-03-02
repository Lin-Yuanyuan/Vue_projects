

export const state = function () {
    return {
        domain: "http://curiosity.daily.com:8360",
        userID: '',
        userName: '',
        islogin: false,
    }
}
//注册事件
export const mutations = {
    changeLogin: function (state, bool) {
        state.islogin = bool
    },


    saveUserinfo: function (state, user) {
        state.userID = user.usID;
        state.userName = user.usName;
    },
}


export const actions = {

    login: function (context) {
        context.commit("changeLogin", true);
        
    },

    logout: function (context) {
        context.commit("changeLogin", false);
    },

    // context.commit('方法名','参数') 
    // 这里的 saveUinfo 是 mutations 中的方法

    saveuser: function (context, user) {
        context.commit("saveUserinfo", user);
    },

}


// Actions接受一个context对象参数，该参数具有和store实例相同的属性和方法，所以我们可以通过context.commit()提交mutations中的方法，

// 或者可以通过context.state和context.getters去获取state和getters。

// context作为上下文对象，可以简单的理解成store实例，有共享store实例的属性和方法的权利，但是切记：context并不是store实例本身。
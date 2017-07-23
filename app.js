var Util = require("common/util.js");

App({

    globalData: {},

    onLaunch: function() {
        var deviceInfo = wx.getStorageSync('deviceInfo');
        if (!deviceInfo) {
            deviceInfo = wx.getSystemInfoSync();
            wx.setStorageSync('deviceInfo', deviceInfo);
        }
        this.globalData.deviceInfo = deviceInfo;

        wx.checkSession({
            success: Util.proxy(this.handleSessionSucc, this),
            fail: Util.proxy(this.handleSessionExpire, this)
        });
    },


    handleSessionSucc: function() {
        var openid = wx.getStorageSync('openid');
        if (!openid) {
             wx.login({success:  Util.proxy(this.handleLoginSucc, this)});
        }
    },

    handleSessionExpire: function() {
        wx.removeStorageSync('openid');
        wx.removeStorageSync('userInfo');
        wx.login({success:  Util.proxy(this.handleLoginSucc, this)});
    },

    handleLoginSucc: function(res){
        if(res.code) {
            wx.request({
                method: 'post',
                url: 'https://nuanwan.wekeji.cn/nuanwan/index.php/wechat/get_user_info',
                header: {'content-type': 'application/x-www-form-urlencoded'},
                data: {
                    code: res.code
                },
                success: Util.proxy(this.handleGetUserInfoSucc, this)
            });
        } 
    },

    handleGetUserInfoSucc: function(response) {
        response = response.data;
        if (response.ret) {
            wx.setStorage({
                key: 'openid',
                data: response.data.openid
            });
            wx.getUserInfo({
                success: Util.proxy(this.handleUserInfoSucc, this)
            });
        }
    },

    handleUserInfoSucc: function(response) {
        wx.setStorage({
            key: 'userInfo',
            data: response.userInfo
        });
    }

})

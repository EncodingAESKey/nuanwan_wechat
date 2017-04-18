var Util = require("../../common/util.js"),
    App = getApp(),
    deviceInfo = App.globalData.deviceInfo;

Page({

    data: {
        latitude: '39.90403',
        longitude: '116.407526',
        controls: [{
            iconPath: '/resources/pin.png',
            position: {
                left: deviceInfo.windowWidth / 2 - 10,
                top: (deviceInfo.windowHeight - 40) / 2 - 28,
                width: 20,
                height: 28
            }
        }, {
            id: 1,
            iconPath: '/resources/center.png',
            position: {
                left: 30,
                top: deviceInfo.windowHeight - 120,
                width: 30,
                height: 30
            },
            clickable: true
        }],
        markers: []
    },

    points: [],

    onLoad: function() {
        wx.getLocation({
            type: 'gcj02',
            success: Util.proxy(this.handleLocationSucc, this),
            fail: function(){}
        });
        this.mapCtx = wx.createMapContext('map');
    },

    handleLocationSucc: function(response) {
        this.setData({
            latitude: response.latitude,
            longitude: response.longitude,
        });
    },

    handleControlTap: function(event) {
        if (event.controlId == 1) {
            this.mapCtx.moveToLocation();
        }
    },

    handleBtnTap: function() {
        wx.navigateTo({
            url: "/pages/postinfo/postinfo"
        });
    },

    onShow: function() {
        var this_ = this;
        wx.request({
            url: 'https://nuanwan.wekeji.cn/nuanwan/get_info.php', 
            header: {'content-type': 'application/json'},
            success: function(res) {
                var data = res.data,
                    markers = [];
                this_.points = data;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    markers.push({
                        id: i,
                        iconPath: "/resources/map.png",
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                        width: 30,
                        height: 37
                    });
                }
                this_.setData({
                    markers: markers
                });
            }
        })
    },


    handleMarkerTap: function(event) {
        var markerId = event.markerId,
            pointInfo = this.points[markerId];

        wx.navigateTo({
            url: "/pages/viewinfo/viewinfo?data=" + JSON.stringify(pointInfo)
        }); 
    }

    
})

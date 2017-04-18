Page({

    sending: false,

    data: {
        success: false,
        address: "点击选择地址",
        message: "",
        contact: "",
        type: "sell",
        longitude: '',
        latitude: '',
        items: [
            { name: 'buy', value: '求购' },
            { name: 'sell', value: '转让', checked: true },
        ]
    },

    handleGetPosition: function() {
        var this_ = this;
        wx.chooseLocation({
            success: function(res) {
                this_.setData({
                    address: res.name || '已选择',
                    longitude: res.longitude,
                    latitude: res.latitude
                })
            }
        })
    },

    handleRadioChange: function(event) {
        this.setData({type: event.detail.value})
    },

    handleMessageChange: function(event) {
        this.setData({message: event.detail.value})
    },

    handleContactChange: function(event) {
        this.setData({contact: event.detail.value})
    },

    handlePostTap: function(){;
        if (this.data.address == "点击选择地址") {
            wx.showToast({title: "请选择您的地址"});
            return;
        }
        if (!this.data.message) {
            wx.showToast({title: "请填写说明信息"});
            return;
        }
        if (!this.data.contact) {
            wx.showToast({title: "请填写联系信息"});
            return;
        }
        this.sendRequset();
    },

    sendRequset: function() {
        var postData = {
            address: this.data.address,
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            message: this.data.message,
            contact: this.data.contact,
            type: this.data.type
        };

        var this_ = this;

        wx.request({
            url: 'https://nuanwan.wekeji.cn/nuanwan/add_info.php', 
            data: postData,
            header: {'content-type': 'application/json'},
            success: function(res) {
               this_.setData({success: true});
            }
        })
    }

})

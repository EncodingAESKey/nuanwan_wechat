var Util = require("../../common/util.js");

Page({

	data: {
		showList: true,
		inputValue: '',
		list: []
	},

	handleInputChange: function(e){
		this.setData({inputValue : e.detail.value});
	},

	handleButtonTap: function() {
		if (!this.data.inputValue) {
			 wx.showToast({title: "请输入搜索词"});
			return;
		}
		wx.request({
            url: 'https://nuanwan.wekeji.cn/nuanwan/index.php/trade/get_search_list', 
            method: 'post',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            data:{
            	keyword: this.data.inputValue
            },
            success: Util.proxy(this.handleGetListSucc, this)
        })
	},

	handleGetListSucc: function(response) {
		response = response.data;
		if(response && response.ret) {
			console.log(1);
			this.setData({
				showList: true,
				list: response.data
			});
		}else {
			console.log(2);
			this.setData({
				showList: false,
				list: []
			});
		}
	},

	handleItemTap: function(e) {
		wx.navigateTo({
            url: "/pages/viewinfo/viewinfo?id=" + e.currentTarget.id
        }); 
	}

});
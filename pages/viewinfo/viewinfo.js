Page({

    data:{
    	address: '',
    	contact: '',
    	latitude: '',
    	longitude: '',
    	message: '',
    	type: ''
    },

    onLoad: function(data){
    	data = JSON.parse(data.data);
    	data.type = data.type == 'buy' ? "求购" : '转让';
        this.setData(data);
    }

})

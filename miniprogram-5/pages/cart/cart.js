const db = wx.cloud.database()
const carts_col = db.collection('carts')

Page({
    data :{
    carts :[],//购物车
    totalCount: 0 ,
    totalPrice: 0,

},
    onLoad(){
        this.loadCartData()


    },
    async loadCartData(){
        let res = await carts_col.get()
        console.log('购物车数据',res)
        this.setData({
            carts : res.data
        }) 
        //统计总价格和总数量
        this.setCart(res.data)
    },
    setCart(carts){
        let totalCount =0
        let totalPrice = 0
        carts.forEach(v=>{
            totalCount +=v.num
            totalPrice +=v.num*v.price
        })
        this.setData({
            totalCount,
            totalPrice
        })
    },
    //点击 当前页面对应的TAB
    onTabItemTap(){
        wx.setTabBarBadge({
          index: 1,
          text: '',
        }) 
    }

})
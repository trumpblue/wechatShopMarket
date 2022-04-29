//get SQL
const db = wx.cloud.database()
//get 集合
const goods_col = db.collection('goods')
const carts_col = db.collection('carts')
//引入 异步操作
import{ml_showLoading,ml_hideLoading,ml_showToast} from'../../utils/asyncWX'
Page({
    data:{
        goods :[],//商品列表数据
        _page: 0,
        //判断是否有更多的数据
        hasMore :true,
        //轮播图
        swipers :[]
    },
    onLoad(){
        this.setTabBar()
        this.loadSwiperData()
        this.loadListData()
    },
    //加载轮播图数据
    //请求访问量前三的商品
    async loadSwiperData()
    {
        //limit3
        //排序，降序
        let res = await goods_col.orderBy('count','desc').limit(3).get()
        console.log('轮播图',res)
        this.setData({
            swipers :res.data
        })
    },
    //加载列表数据
   async  loadListData(){
       //1,2,3,4,5,6,7,8,……
       const LIMIT = 5
       let {_page,goods}=this.data//0
    //    显示加载款
        await ml_showLoading()
         let res = await goods_col.limit(LIMIT).skip(_page*LIMIT).get()

    // 隐藏加载框
    ml_hideLoading()
    //手动停止下拉刷新
    wx.stopPullDownRefresh()
       console.log('列表数据',res.data)
         this.setData({
            goods :[...goods,...res.data],
            _page : ++_page,//1
            hasMore :res.data.length===LIMIT
         })
    },
    //上拉刷新
    //Q 分页
    //Q 解决覆盖问题 
    onReachBottom(){
        if(!this.data.hasMore)//没有更多的数据
        {
            ml_showToast('没有更多的数据辽QWQ')
            return console.log('没有更多宝贝了捏QAQ')
        }
        console.log('上拉')
        this.loadListData()
    },
    //下拉刷新
    onPullDownRefresh()
    {
   
        console.log('下拉刷新')  
           //1.重置
        this.setData({
            goods :[],
            _page :0,
            hasMore :true
        })
        //2. 加载最新的数据
        this.loadListData()
    },
    async addCart(e){
        //1. get goods
        let {item }= e.currentTarget.dataset 
        // console.log('item',item) 
        // 2. 是否在购物车里面
        //根据_id从购物车中获取数据 看看是否可以获取到
        //  let res = await carts_col.doc('5464a294625bcf270087bfab7e0de60e').get() 
        //  console.log('有值',res)
try{
      let res = await carts_col.doc(item._id).get() 
    console.log('有值')
    //有值 num+1
await carts_col.doc(item._id).updata({
    data:{
        num :db.command.inc(1)
    }
})
wx.showToast({
    title:'下单成功',
})
}catch(err){
    console.log('没有值')
    //加入购物车中
    await carts_col.add({
        data :{
            _id :item._id,
            imageSrc : item.imageSrc,
            price: item.price,
            title: item.title,
            num : 1 
        }
    })
    wx.showToast({
        title: '下单成功',
    })

}
    this.setTabBar()
    },
    //修改tabBar右上角的数字
    async setTabBar()
    {
        let total = 0;
        let res = await carts_col.get()
        res.data.forEach(v=>{
            total +=v.num
        })
        if(total ===0 ) return
        wx.setTabBarBadge({
          index: 1,
          text: total+'',
        })
    }
})


const db = wx.cloud.database()
const goods_col =db.collection('goods')
Page({
    data:{
        detail:{}
    },
    onLoad(options){
        let{ id }=options
        this.loadDetailData(id)
    },
    //加载详情
    async loadDetailData(id){
        //拿到数据库的商品
        let ins = goods_col.doc(id)
        //+1
        await ins.update(
            {
                data:{
                    count : db.command.inc(1)
                }
            }
        )
        //获取
        let res = await ins .get()
        //赋值
        this.setData({
            detail: res.data
        })
        // //count+1
        // let res1= await goods_col.doc(id).update({    
        //     data:{
        //     count : db.command.inc(1)}})
        //获取详情数据
        // let res=await goods_col.doc(id).get()
        // console.log('商品信息',res)
        // this.setData({
        //     detail:res.data
        // })
    }
})
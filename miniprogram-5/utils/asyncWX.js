// 显示加载框
export const ml_showLoading =() =>{
return new Promise((resolve)=>{
    wx.showLoading({
      title: 'Loading....QAQ',
      success :resolve
    })
})
}
// 隐藏加载框
export const ml_hideLoading =() =>{
    return new Promise((resolve)=>{
        wx.hideLoading({
          title: 'Loading....QAQ',
          success :resolve
        })
    })
    }
// 消息提示框
export const ml_showToast =(title) =>{
    return new Promise((resolve)=>{
        wx.showToast({ 
            title,
            icon:'none',
            success :resolve
        })
    })
    }
    //消息提框
    
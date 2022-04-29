// app.js
App({
  onLaunch:function() {
    wx.cloud.init({
      env:'cloud1-0gm32wbt6db5ef6d'
    })

  },
  globalData: {
    userInfo: null
  }
})

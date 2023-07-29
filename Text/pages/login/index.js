import{
  loginRequest
}from"../../api/main"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId:'',//学号
    password:'',//密码
    saveCount:true,//记住账号
  },
  switchCheckStatus(){
    this.setData({
      saveCount:!this.data.saveCount
    })
  },
  initAccount(){
    const accountCache = wx.getStorageSync('account')
    if(accountCache){
      this.setData({
        ...accountCache
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAccount()
  },
  login(){
    const that = this
    const postData = {
      stuId:that.data.stuId,
      password:that.data.password
    }
    wx.showLoading({
      title: '登录中。。。',
    })
    loginRequest(postData).then(res=>{
      wx.hideLoading()
      console.log(postData)
        if(res.code == -1){
          if(res.msg !=="学号和密码不能为空"){
            wx.showToast({
              title: '账号密码错误！',
              icon:'none'
            })
          }else{
            wx.showToast({
              title: res.msg,
              icon:'none'
            })
          }
          return 
        }
        if(that.data.saveCount){
          wx.setStorageSync('account', postData)
        }
          wx.setStorageSync('token', res.data.cookie)
          if(that.data.saveCount){
            wx.setStorageSync('account', postData)
          }else{
            wx.removeStorageSync('account')
          }
          wx.showToast({
            title: '登录成功',
            icon: 'none'
          })
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/index/index',
          })
        },1500)
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})